import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import sunImage from "../../assets/img/8k_sun.jpg";

import * as THREE from "three";

export default function Solar(props) {
  const [sunSizeFactor, setSunSizeFactor] = useState(400);
  const sunRadius = 695700;
  const sunRotationTime = 609.12;

  const sunMap = useLoader(TextureLoader, sunImage);
  const sunRef = useRef();
  useEffect(() => {
    props.sunRatio && setSunSizeFactor(500);
  }, []);
  useFrame(() => {
    sunRef.current.rotation.y += 1 / sunRotationTime;
  });

  return (
    <>
      <mesh ref={sunRef} rotateZ={(7.25 * Math.PI) / 180} frustumCulled={false}>
        <sphereGeometry args={[sunRadius / sunSizeFactor, 100, 100]} />
        <meshBasicMaterial map={sunMap} />
      </mesh>
    </>
  );
}
