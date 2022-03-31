import { React, useState, Suspense, useEffect, useRef } from "react";

import { gsap, CSSPlugin } from "gsap";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import "./slick/slick.css";
import "./slick/slick-theme.css";
import styled from "styled-components";
import Earth from "../components/three.js/Earth";
import { TextAnimation } from "../components/Animaition";
import "./Home.scss";

// const plugin = CSSPlugin;
const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;s
  margin: 0;
`;
const TextContainer = styled.div`
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: block;
  position: absolute;
  max-width: 225px;
  z-index: 2;
`;
const StyledH1 = styled.h1`
  color: #fff;
  text-transform: uppercase;
  font-size: 42px;
  margin: 0;
  line-height: 47px;
  letter-spacing: 2px;
`;
const StyledSpan = styled.span`
  transform: skew(-10deg);
  display: block;
  float: left;
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px,
    #533d4a 4px 4px;
  transform: translateX(-50%) rotate(-10deg);
  display: block;
  float: left;
  left: 50%;
  position: relative;
`;
const StyledButton = styled.button`
  float: left;
  position: relative;
  bottom: -65px;
  left: 50%;
  transform: translateX(-50%) rotate(-10deg);
  color: red;
  text-transform: uppercase;
  cursor: pointer;
`;

function Home() {
  let textRef = useRef(null);
  const onClick = () => {
    window.location.replace(`/slide`);
  };
  // useEffect(() => {
  //   TextAnimation(textRef);
  // }, []);
  return (
    <div>
      <TextContainer ref={(el) => (textRef = el)}>
        <StyledH1>
          <StyledSpan className="title">3D</StyledSpan>
          <StyledSpan className="title">태양계가</StyledSpan>
          <StyledSpan className="title">보고싶다면?</StyledSpan>
        </StyledH1>
        <StyledButton onClick={onClick}>Click ME!</StyledButton>
      </TextContainer>

      <CanvasContainer>
        <Canvas>
          <Suspense fallback={null}>
            <Stars
              radius={300}
              depth={60}
              count={20000}
              factor={7}
              saturation={0}
              fade={true}
            />
            <Earth />
          </Suspense>
        </Canvas>
      </CanvasContainer>
    </div>
  );
}

export default Home;
