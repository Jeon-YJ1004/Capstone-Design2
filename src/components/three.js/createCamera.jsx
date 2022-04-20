import * as THREE from "three";
import { React, useState, useRef, useEffect, Suspense } from "react";

import {
  PerspectiveCamera,
  useProgress,
  Html,
  OrbitControls,
} from "@react-three/drei";
export default function CreateCamera() {
  const cameraRef = useRef();
  const camera = new THREE.PerspectiveCamera(
    45,

    1,
    100000
  );
  camera.position.z = 579;
  camera.position.x = -200;
  return camera;
}
