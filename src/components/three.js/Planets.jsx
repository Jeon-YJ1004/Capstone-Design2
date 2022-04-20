import React, { useEffect, useRef, useState, useCallback } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import * as THREE from "three";
import { Html, OrbitControls, Shadow, Stars } from "@react-three/drei";

import celestialJson from "../../assets/celestials";
import SaturnRingMap from "../../assets/img/8k_saturn_ring_alpha.png";
import DetailCel from "./DetailCel";

const Planets = (props) => {
  const celestialData = celestialJson.filter((cel) => cel.name === props.name);

  const orbitDetail = 500; // how many segment compound the orbit ellipse
  const detailLevel = 50; // sphere geometry detail

  const [speedFactor, setSpeedFactor] = useState(
    props.planetRatioReal ? 15000 : 30000
  ); // divide real speed
  const [sizeFactor, setSizeFactor] = useState(
    props.planetRatioReal ? 160 : celestialData[0].sizeFactor
  ); //diameter/sizeFactor
  const [orbitFactor, setOrbitFactor] = useState(
    props.planetRatioReal ? 90 : celestialData[0].orbitFactor
  ); // 1000000

  const [textureMap, ringMap] = useLoader(TextureLoader, [
    celestialData[0].image,
    SaturnRingMap,
  ]);
  const planetRef = useRef();
  const groupRef = useRef();
  const ringRef = useRef();

  const [counter, setCounter] = useState(0);
  const [curveToFrame, setCurveToFrame] = useState();

  const [modalState, setModalState] = useState(false);
  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current?.show();
    setModalState(true);
  };

  const closeModal = (event) => {
    // event.preventDefault();
    console.log("close");
    setModalState(false);
  };

  function Get3dPoints(points2D) {
    let points3D = [];

    for (let i = 0; i < points2D.length; i++) {
      points3D.push(new THREE.Vector3(points2D[i].x, points2D[i].y, 0.0));
    }

    return points3D;
  }

  useEffect(() => {
    setModalState(false);
  }, [props.closeModal]);
  useEffect(() => {
    if (props.doOrbit) {
      if (props.planetRatioReal) {
        setSpeedFactor(15000);
        setSizeFactor(160);
        setOrbitFactor(90);
      } else {
        setSpeedFactor(30000);
        setSizeFactor(celestialData[0].sizeFactor);
        setOrbitFactor(celestialData[0].orbitFactor);
      }
      let aphelion = celestialData[0].aphelion;
      let perihelion = celestialData[0].perihelion;
      let eccentricity = celestialData[0].orbitalEccentricity;

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
      setCurveToFrame(ellipse);
      // 공전 궤도 선
      // <line geometry={lineGeometry} name="orbit">

      //   {console.log("return line")}
      //   <lineBasicMaterial attach="material" color="white" linewidth={100} />
      // </line>;
    }

    // 자전 궤도의 기울어진 정도
    planetRef.current.rotation.z +=
      (celestialData[0].obliquityToOrbit * Math.PI) / 180;
    planetRef.current.rotation.x = -(Math.PI / 2);
    groupRef.current.rotation.x = Math.PI / 2;
    groupRef.current.rotation.y =
      (celestialData[0].orbitalInclination * Math.PI) / 180;
    // ringRef.current.rotation.z +=
    //   (celestialData[0].obliquityToOrbit * Math.PI) / 180;
    // ringRef.current.rotation.x = -(Math.PI / 2);
  }, [props.planetRatioReal, props.doOrbit]);
  // 공전 궤도
  useFrame(() => {
    //자전
    planetRef.current.rotation.y += 1 / celestialData[0].rotationPeriod;
    if (props.doOrbit && counter <= 1 && !(curveToFrame === undefined)) {
      //공전

      planetRef.current.position.copy(curveToFrame.getPoint(counter));

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
      {modalState && (
        <DetailCel
          name={celestialData[0].name}
          state={modalState}
          closeModal={closeModal}
          position={props.position}
        />
      )}
      <ambientLight color="#f6f3ea" intensity={0.04} />
      <group castShadow receiveShadow ref={groupRef} position={props.position}>
        <mesh ref={planetRef} onClick={openModal}>
          <sphereGeometry
            args={[
              celestialData[0].diameter / sizeFactor,
              detailLevel,
              detailLevel,
            ]}
          />
          <meshLambertMaterial map={textureMap} />
          <Shadow />
          {props.doOrbit && (
            <Html as="div" style={{ color: "white" }} onClick={openModal}>
              {celestialData[0].name}
            </Html>
          )}
        </mesh>
        {/* {props.name === "Saturn" && (
          <mesh ref={ringRef}>
            <ringBufferGeometry
              innerRadius={900}
              outerRadius={1500}
              thetaSegments={180}
              phiSegments={80}
            />
            {console.log("ring")}
            <meshBasicMaterial map={ringMap} />
          </mesh>
        )} */}

        {!props.doOrbit && (
          <Stars
            radius={6000}
            depth={50}
            count={800}
            factor={6}
            saturation={0}
            fade={true}
          />
        )}
      </group>
    </>
  );
};
export default Planets;
