import React, { useRef, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import styled from "styled-components";

import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Loading from "../Loading";
import Planets from "./Planets";
import sunImage from "../../assets/img/8k_sun.jpg";
import celestialJson from "../../assets/celestials";
import Headers from "../header/Header";
const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
`;

export default function SolarSystem() {
  const sunSizeFactor = 400;
  const sunRadius = 695700;
  const sunRotationTime = 609.12;

  const sunMap = useLoader(TextureLoader, sunImage);
  const sunRef = useRef();
  // useFrame(() => {
  //   sunRef.current.rotation.y += 1 / sunRotationTime;
  // });

  return (
    <>
      <Headers solarSystem={false} />
      <CanvasContainer>
        <Canvas
          camera={{
            position: [0, 0, 40000],
            fov: 45,
            near: 1,
            far: 1000000,
          }}
        >
          <Suspense fallback={<Loading />}>
            <Stars
              radius={100000}
              depth={60}
              count={20000}
              factor={7}
              saturation={0}
              fade={true}
            />
            <pointLight
              color={0xffffff}
              intensity={4}
              power={7 * Math.PI}
              position={[0, 0, 0]}
            />
            <mesh
              ref={sunRef}
              rotateZ={(7.25 * Math.PI) / 180}
              frustumCulled={false}
            >
              <sphereGeometry args={[sunRadius / sunSizeFactor, 100, 100]} />
              <meshBasicMaterial map={sunMap} />
            </mesh>
            {celestialJson.map((planet) => {
              return (
                <Planets key={planet.name} name={planet.name} doOrbit={true} />
              );
            })}
            <OrbitControls
              enableZoom={true}
              maxZoom={3}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={0.6}
              panSpeed={0.5}
              rotateSpeed={0.4}
            />
          </Suspense>
        </Canvas>
      </CanvasContainer>{" "}
    </>
  );
}
