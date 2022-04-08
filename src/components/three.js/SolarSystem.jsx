import React, { useRef, Suspense, useState } from "react";
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
  const isRatioReal = useState(props.ratio);

  return (
    <>
      <Headers solarSystem={false} />
      <Suspense fallback={null}>
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
              <Solar sunRatio={isRatioReal} />
              {celestialJson.map((planet) => {
                return (
                  <Planets
                    key={planet.name}
                    name={planet.name}
                    doOrbit={true}
                    planetRatio={isRatioReal}
                  />
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
        </CanvasContainer>
      </Suspense>
    </>
  );
}
const CanvasContainer = styled.div`
  width: 100%;
  height: 90vh;
  margin: 0;
  top: 100px;
`;
