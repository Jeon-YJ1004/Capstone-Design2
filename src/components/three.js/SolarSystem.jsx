import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import * as THREE from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import Planets from "./Planets";
import sunImage from "../../assets/img/8k_sun.jpg";
import celestialJson from "../../assets/celestials";
import Earth from "./Earth";

export default function SolarSystem() {
  const sunSizeFactor = 400;
  const sunRadius = 695700;
  const sunRotationTime = 609.12;

  const sunMap = useLoader(TextureLoader, sunImage);
  const sunRef = useRef();
  useFrame(() => {
    sunRef.current.rotation.y += 1 / sunRotationTime;
  });

  return (
    <>
      <pointLight
        color={0xffffff}
        intensity={4}
        power={7 * Math.PI}
        position={[0, 0, 0]}
      />
      <mesh ref={sunRef} rotateZ={(7.25 * Math.PI) / 180} frustumCulled={false}>
        <sphereGeometry args={[sunRadius / sunSizeFactor, 100, 100]} />
        <meshBasicMaterial map={sunMap} />
      </mesh>

      {celestialJson.map((planet) => {
        return <Planets key={planet.name} name={planet.name} />;
      })}
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
