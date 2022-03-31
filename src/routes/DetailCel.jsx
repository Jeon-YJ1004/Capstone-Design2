import { React, useState, Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Planets from "../components/three.js/Planets";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
`;

export default function DetailCel(props) {
  const celestial = props.name;
  console.log(celestial);
  return (
    <div>
      {/* <Planets key={celestial} name={celestial} doOrbit={false} /> */}
    </div>
  );
}
