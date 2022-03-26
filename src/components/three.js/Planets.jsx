import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { BufferGeometry, EllipseCurve, TextureLoader } from "three";

import * as THREE from "three";
import { OrbitControls, Shadow, Stars } from "@react-three/drei";

import celestialJson from "../../assets/celestials";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import SaturnRingMap from "../../assets/img/8k_saturn_ring_alpha.png";

export default function Planets(props) {
  const sizeFactor = 160; // 1
  const orbitFactor = 50; // 1000000
  const orbitDetail = 500; // how many segment compound the orbit ellipse
  const detailLevel = 50; // sphere geometry detail
  const speedFactor = 20000; // divide real speed

  const celestialData = celestialJson.filter((cel) => cel.name === props.name);
  let aphelion = celestialData[0].aphelion;
  let perihelion = celestialData[0].perihelion;
  let eccentricity = celestialData[0].orbitalEccentricity;

  const [textureMap, ringMap] = useLoader(TextureLoader, [
    celestialData[0].image,
    SaturnRingMap,
  ]);
  const planetRef = useRef();
  const groupRef = useRef();
  const [counter, setCounter] = useState(0);
  const [curveToFrame, setCurveToFrame] = useState();

  //토성일경우 고리 만들어주기
  if (props.name === "Saaturn") {
  }

  function Get3dPoints(points2D) {
    let points3D = [];

    for (let i = 0; i < points2D.length; i++) {
      points3D.push(new THREE.Vector3(points2D[i].x, points2D[i].y, 0.0));
    }

    return points3D;
  }

  useEffect(() => {
    //행성의 원일점, 근일점, 이심률로 공전 궤도 계산하기
    aphelion *= orbitFactor;
    perihelion *= orbitFactor;
    const majorAxis = aphelion + perihelion;
    const foci = majorAxis / 2 - perihelion;
    const minorAxis =
      2 * (foci / eccentricity) * Math.sqrt(1 - Math.pow(eccentricity, 2));
    const radiusX = majorAxis / 2;
    const radiusY = minorAxis / 2;

    let curve = new THREE.EllipseCurve(
      0,
      0, // aX, aY
      radiusX, // xRadius
      radiusY, // yRadius
      0,
      2 * Math.PI, // aStartAngle, aEndAngle
      false, // aClockwise
      0 // aRotation
    );
    // 2차원 타원 궤도를 3차원 타원 좌표로 변환
    let ellipse = new THREE.CatmullRomCurve3(
      Get3dPoints(curve.getPoints(orbitDetail))
    );
    console.log("ellipse", ellipse);
    let ellipsePoints = ellipse.getPoints(orbitDetail);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(
      ellipsePoints
    );
    // 자전 궤도의 기울어진 정도
    planetRef.current.rotation.z +=
      (celestialData[0].obliquityToOrbit * Math.PI) / 180;
    planetRef.current.rotation.x = -(Math.PI / 2);
    groupRef.current.rotation.x = Math.PI / 2;
    groupRef.current.rotation.y =
      (celestialData[0].orbitalInclination * Math.PI) / 180;
    setCurveToFrame(ellipse);

    // 공전 궤도 선
    // <line geometry={lineGeometry} name="orbit">
    //   {console.log("return line")}
    //   <lineBasicMaterial attach="material" color="white" linewidth={100} />
    // </line>;
  }, []);
  // 공전 궤도
  useFrame(() => {
    //자전
    planetRef.current.rotation.y += 1 / celestialData[0].rotationPeriod;

    if (counter <= 1 && !(curveToFrame === undefined)) {
      //공전

      planetRef.current.position.copy(curveToFrame.getPoint(counter));
      // console.log(planetRef.current.position.y, "copy이후 y");

      setCounter(
        (current) => current + celestialData[0].orbitalVelocity / speedFactor
      );
    } else {
      setCounter(0);
    }
    return;
  });

  return (
    <>
      <ambientLight color="#f6f3ea" intensity={0.04} />
      <group castShadow receiveShadow ref={groupRef}>
        <mesh ref={planetRef}>
          <sphereGeometry
            args={[
              celestialData[0].diameter / sizeFactor,
              detailLevel,
              detailLevel,
            ]}
          />
          <meshLambertMaterial map={textureMap} />
          <Shadow />
        </mesh>
      </group>

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={1}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />
    </>
  );
}
