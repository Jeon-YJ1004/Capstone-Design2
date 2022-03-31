import { React, useState, useRef, useEffect, Suspense, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Loader, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import "./slick/slick.css";
import "./slick/slick-theme.css";
import styled from "styled-components";
import Headers from "../components/header/Header";

import celestialJson from "../assets/celestials";
import useInterval from "../hooks/useInterval";
import Earth from "../components/three.js/Earth";

import Planets from "../components/three.js/Planets";
import SolarSystem from "../components/three.js/SolarSystem";

import DetailCel from "./DetailCel";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
`;
const moveCamera = () => {};

function Rig({ children }) {
  const outer = useRef(THREE.Group);
  const inner = useRef(THREE.Group);
  useFrame(({ camera, clock }) => {
    // outer.current.position.y = THREE.MathUtils.lerp(
    //   outer.current.position.y,
    //   0,
    //   0.05
    // );
    // inner.current.rotation.y = Math.sin(clock.getElapsedTime() / 8) * Math.PI;
    // inner.current.position.z =
    //   10000 + -Math.sin(clock.getElapsedTime() / 2) * 10;
    // inner.current.position.y = -5 + Math.sin(clock.getElapsedTime() / 2) * 2;
  });
  return (
    <group position={[0, -100, 0]} ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

function CelSlide() {
  const [slideProgress, setSlideProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const childRef = useRef();

  const next = () => {
    setSlideIndex(slideIndex + 1 >= celestialJson.length ? 0 : slideIndex + 1);
    setSlideProgress(0);
    console.log("next");
  };
  const previous = () => {
    setSlideIndex(slideIndex === 0 ? celestialJson.length - 1 : slideIndex - 1);
    setSlideProgress(0);

    console.log("prev");
  };

  useInterval(
    () => {
      if (slideProgress >= 100) {
        setSlideProgress(0);
        next();
      } else {
        setSlideProgress(slideProgress + 1 / (0.1 + 4));
      }
    },
    isRunning ? 10 : null
  );
  const mouseWheel = (e) => {
    e.preventDefault();
    console.log("scroll");
    if (e.deltaY < 0) {
      previous();
    } else {
      next();
    }
  };

  // useEffect(() => {
  //   const celestial = celestialJson.filter((cel) => cel.index === slideIndex);
  //   const zoom = celestial[0].zoom;
  // }, [slideIndex]);

  return (
    <div onScroll={mouseWheel}>
      <Headers />

      <div>
        <CanvasContainer>
          <Canvas
            concurrent
            camera={{
              position: [0, 0, 40000],
              fov: 45,
              near: 1,
              far: 100000000,
            }}
          >
            {/* <perspectiveCamera 
              position= {[0, 0, 40000]}
              fov={45}
              near={1}
              far={100000000}
            /> */}
            <Suspense fallback={null}>
              <Stars
                radius={100000}
                depth={60}
                count={20000}
                factor={7}
                saturation={0}
                fade={true}
              />
              <Rig>
                <SolarSystem />
              </Rig>
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={1}
                panSpeed={0.5}
                rotateSpeed={0.4}
              />
            </Suspense>
          </Canvas>
        </CanvasContainer>
        <input
          value={slideIndex}
          type="range"
          min={0}
          max={celestialJson.length}
        />
        <button
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
      </div>
    </div>
  );
}

export default CelSlide;
