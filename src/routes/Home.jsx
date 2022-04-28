import { React, useState, Suspense, useEffect, useRef, Fragment } from "react";

import { gsap, CSSPlugin } from "gsap";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Timeline, Tween } from "react-gsap";

import "./slick/slick.css";
import "./slick/slick-theme.css";
import styled from "styled-components";
import Earth from "../components/three.js/Earth";
import "./Home.scss";
import Loading from "../components/Loading";

// const plugin = CSSPlugin;

function Home() {
  let textRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const onClick = () => {
    window.location.replace(`/Capstone-Design2/slide`);
  };

  return (
    <div>
      <>
        <TextContainer>
          <Timeline
            target={
              <Fragment>
                <StyledSpan className="title">3D</StyledSpan>
                <StyledSpan className="title">태양계가</StyledSpan>
                <StyledSpan className="title">보고싶다면?</StyledSpan>

                <StyledButton onClick={onClick}>Click ME!</StyledButton>
              </Fragment>
            }
          >
            <Tween
              stagger={{ duration: 0.5 }}
              from={{ opacity: 0, bottom: -80 }}
              to={{ opacity: 1, bottom: 0 }}
              ease="back.out(1.7)"
              target={0}
            />

            <Tween
              stagger={{ duration: 0.5 }}
              from={{ opacity: 0, bottom: -80 }}
              to={{ opacity: 1, bottom: 0 }}
              ease="back.out(1.7)"
              target={1}
            />
            <Tween
              stagger={{ duration: 0.5 }}
              from={{ opacity: 0, bottom: -80 }}
              to={{ opacity: 1, bottom: 0 }}
              ease="back.out(1.7)"
              target={2}
            />
            <Tween
              stagger={{ duration: 0.5 }}
              from={{ opacity: 0, bottom: -80 }}
              to={{ opacity: 1, bottom: 0 }}
              ease="back.out(1.7)"
              target={3}
            />
          </Timeline>
        </TextContainer>

        <CanvasContainer>
          <Canvas>
            <Suspense fallback={<Loading />}>
              <Stars
                radius={300}
                depth={60}
                count={8000}
                factor={7}
                saturation={0}
                fade={true}
              />

              <Earth />
            </Suspense>
          </Canvas>
        </CanvasContainer>
      </>
    </div>
  );
}

export default Home;

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

const StyledSpan = styled.span`
  display: flex;
  transform: skew(-10deg);
  font-size: 42px;
  line-height: 47px;
  letter-spacing: 2px;
  display: block;
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px,
    #533d4a 4px 4px;
  transform: translateX(-50%) rotate(-10deg);
  float: left;
  left: 50%;
  position: relative;
  padding: 10px;
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
