import React, { useRef, Suspense, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import styled from "styled-components";

import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Solar from "./Solar";
import Loading from "../Loading";
import Planets from "./Planets";
import celestialJson from "../../assets/celestials";
import Headers from "../header/Header";

export default function SolarSystem(props) {
  const [isRatioReal, setIsRatioReal] = useState(true);
  const [cameraZ, setCameraZ] = useState(400000);
  const [cameraY, setCameraY] = useState(0);
  useEffect(() => {
    if (isRatioReal) {
      setCameraZ(40000);
      setCameraY(10000);
    }
  }, [isRatioReal]);

  return (
    <>
      <Headers
        solarSystem={false}
        setIsRatioReal={setIsRatioReal}
        isRatioReal={isRatioReal}
      />
      <Suspense fallback={null}>
        <CanvasContainer>
          <Canvas
            camera={{
              position: [0, cameraY, cameraZ],
              fov: 55,
              near: 1,
              far: 1000000,
            }}
          >
            <Suspense fallback={<Loading />}>
              <Stars
                radius={280000}
                depth={0}
                count={4000}
                factor={10}
                saturation={0}
                fade={true}
              />
              <pointLight
                color={0xffffff}
                intensity={4}
                power={7 * Math.PI}
                position={[0, 0, 0]}
              />
              <Solar sunRatioReal={!isRatioReal} />
              {celestialJson.map((planet) => {
                return (
                  <Planets
                    key={planet.name}
                    name={planet.name}
                    doOrbit={true}
                    planetRatioReal={!isRatioReal}
                  />
                );
              })}
              <OrbitControls
                enableZoom={true}
                maxZoom={2}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.6}
                panSpeed={0.5}
                rotateSpeed={0.4}
              />
            </Suspense>
          </Canvas>
        </CanvasContainer>
      </Suspense>
    </>
  );
}
const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  top: 100px;
`;
