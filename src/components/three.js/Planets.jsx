import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { BufferGeometry, EllipseCurve, TextureLoader } from "three";

import * as THREE from "three";
import { OrbitControls, Shadow, Stars } from "@react-three/drei";

import celestialJson from "../../assets/celestials";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";

function get3dPoints(points2D) {
  let points3D = [];

  for (let i = 0; i < points2D.length; i++) {
    points3D.push(new THREE.Vector3(points2D[i].x, points2D[i].y, 0.0));
  }

  return points3D;
}

export default function Planets(props) {
  const sizeFactor = 160; // 1
  const orbitFactor = 50; // 1000000
  const orbitDetail = 500; // how many segment compound the orbit ellipse
  const detailLevel = 50; // sphere geometry detail
  const speedFactor = 20000; // divide real speed

  const celestialData = celestialJson.filter((cel) => cel.name === props.name);

  console.log(celestialData[0]);
  const textureMap = useLoader(TextureLoader, celestialData[0].image);
  const planetRef = useRef();

  // 자전 궤도의 기울어진 정도
  useEffect(() => {
    planetRef.current.rotation.z +=
      (celestialData[0].obliquityToOrbit * Math.PI) / 180;
  }, []);
  // 공전 궤도
  useFrame(() => {
    planetRef.current.rotation.y += 1 / celestialData[0].rotationPeriod;
    // celestialData[0].obliquityToOrbit *Math.PI/180
  });

  //원일점, 근일점, 이심률로 타원 궤도 계산하기
  const Ecliptic = ({ aphelion, perihelion, eccentricity }) => {
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
    //2차원 타원 궤도를 3차원 타원 좌표로 변환
    let ellipse = new THREE.CatmullRomCurve3(
      get3dPoints(curve.getPoints(orbitDetail))
    );
    console.log("ellipse :", ellipse);
    let ellipsePoints = ellipse.getPoints(orbitDetail);
    const lineGeometry = new THREE.BufferGeometry();
    console.log(ellipsePoints);
    // for (let i = 0; i < ellipsePoints.length; i++) {
    //   lineGeometry.vertices.push(ellipsePoints[0]);
    // }
    lineGeometry.setAttribute("position", new THREE.Buffer());
    return (
      <mesh geometry={curve}>
        <lineBasicMaterial color="red" />
      </mesh>
    );
  };
  return (
    <>
      <spotLight color="#f6f3ea" intensity={1} position={[1, 1, 1]} />
      <group>
        <mesh ref={planetRef} castShadow receiveShadow>
          <sphereGeometry
            args={[
              celestialData[0].diameter / sizeFactor,
              detailLevel,
              detailLevel,
            ]}
          />
          <sphereGeometry args={[1, 32, 32]} />
          <meshLambertMaterial map={textureMap} />
          <Shadow />
        </mesh>
        <Ecliptic
          aphelion={celestialData[0].aphelion}
          perihelion={celestialData[0].perihelion}
          eccentricity={celestialData[0].orbitalEccentricity}
        />
      </group>

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />
    </>
  );
}
