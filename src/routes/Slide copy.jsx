import { React, useState, useRef, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  PerspectiveCamera,
  useProgress,
  Html,
  OrbitControls,
} from "@react-three/drei";
import styled from "styled-components";
import { Timeline, Tween } from "react-gsap";
import * as TWEEN from "@tweenjs/tween.js";

import "./slick/slick.css";
import "./slick/slick-theme.css";

import Headers from "../components/header/Header";
import Slider from "react-slick";
import celestialJson from "../assets/celestials";
import useInterval from "../hooks/useInterval";
import Planets from "../components/three.js/Planets";
import Roket from "../assets/img/rocket-solid.svg";
import createCamera from "../components/three.js/createCamera";

function animate(callback) {
  function loop(time) {
    callback(time);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

export default function CelSlide() {
  const [slideProgress, setSlideProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidePrevIndex, setSlidePrevIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const sliderRef = useRef();

  // const [cameraX, setCameraX] = useState(200);
  // const [cameraZ, setCameraZ] = useState(200);
  const [targetZ, setTargetZ] = useState(579);
  const [updateCount, setUpdateCount] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const camera = createCamera();

  const cameraRef = useRef();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,

    scroll: true,
    adaptiveHeight: true,
    afterChange: () => setUpdateCount((current) => current + 1),
    beforeChange: (current, next) => {
      setSlidePrevIndex(current);
      setSlideIndex(next);
    },
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const next = () => {
    setSlidePrevIndex(slideIndex);
    setSlideIndex(slideIndex + 1 >= celestialJson.length ? 0 : slideIndex + 1);
    setSlideProgress(0);
    // sliderRef.current.slickNext();
  };
  const previous = () => {
    setSlidePrevIndex(slideIndex);
    setSlideIndex(slideIndex === 0 ? celestialJson.length - 1 : slideIndex - 1);
    setSlideProgress(0);
    // sliderRef.current.slickPrev();
  };
  const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return (
      <Html as="div" center style={{ color: "white" }}>
        {progress} % loaded
      </Html>
    );
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
    setIsScroll((current) => !current);

    if (e.deltaY < 0) {
      previous();
    } else {
      next();
    }
  };

  //슬라이드 변경시 카메라 줌
  useEffect(() => {
    // let prevSize = celestialJson.filter(
    //   (cel) => cel.index === slidePrevIndex
    // )[0].diameter;
    // let currentSize = celestialJson.filter((cel) => cel.index === slideIndex)[0]
    //   .diameter;

    setTargetZ(
      celestialJson.filter((cel) => cel.index === slideIndex)[0]
        .distanceFromSun * 10
    );
    console.log(slideIndex, targetZ);
    console.log(camera.position);
    camera.position.set(
      579,
      0,
      celestialJson.filter((cel) => cel.index === slideIndex)[0]
        .distanceFromSun * 10
    );
  }, [slideIndex, targetZ]);

  return (
    <StyledDiv onWheel={mouseWheel}>
      <Headers solarSystem={true} />

      <StyledSlider ref={sliderRef} {...settings}>
        <CanvasContainer>
          <Canvas concurrent>
            {/* <PerspectiveCamera
              makeDefault
              ref={cameraRef}
              position={[cameraX, 0, targetZ]}
              fov={45}
              near={1}
              far={100000}
              onUpdate={(self) => self.updateProjectionMatrix()}
            /> */}

            <Suspense fallback={<Loader />}>
              <pointLight intensity={0.4} position={[1000, 0, 1000]} />

              {celestialJson.map((cel) => (
                <Planets
                  key={cel.name}
                  name={cel.name}
                  doOrbit={false}
                  position={[0, 0, cel.distanceFromSun * 10]}
                  planetRatio={true}
                  closeModal={isScroll}
                />
              ))}
            </Suspense>

            <OrbitControls />
          </Canvas>
          <ProgressBar>
            <Input
              readOnly
              value={slideIndex}
              type="range"
              min={0}
              max={celestialJson.length}
            />
            {/* <FontAwesomeIcon icon={faRocket} /> */}
            <StyledBtn
              onClick={() => {
                setIsRunning(!isRunning);
              }}
            >
              {isRunning ? (
                <FontAwesomeIcon icon={faPause} width="30px" />
              ) : (
                <FontAwesomeIcon icon={faPlay} width="30px" />
              )}
            </StyledBtn>
          </ProgressBar>
        </CanvasContainer>
      </StyledSlider>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  margin: 0;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  // flex-direction: column; /*수직 정렬*/
  // align-items: center;
  // justify-content: center;
  background-color: black;
`;
const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
`;

const StyledSlider = styled(Slider)`
  height: 100vh; //슬라이드 컨테이너 영역
  width:100%;
  display: flex;
  position:absolute
  top: 100px;
  .slick-list {
    //슬라이드 스크린
    width: 100%;

    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-slide div {
    //슬라이더  컨텐츠
   
  }

  // .slick-dots {
  //   //슬라이드의 위치
  //   bottom: 20px;
  //   margin-top: 200px;
  // }

  // .slick-track {
  //   width: 100%;
  // }
`;
const ProgressBar = styled.div`
  z-index: 2;
  align-items: center;
  position: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Input = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  width: 80%; 
  height: 15px;
  background: none; 
  border 2px solid #ADFF2F;
  border-radius: 500px;

  ::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: url(${Roket});
    cursor: pointer; /* Cursor on hover */

      
`;

const StyledBtn = styled.button`
  background-color: black;
  color: #eee8aa;
  border: none;
  height: 40px;
  .svg-inline--fa {
    display: var(--fa-display, inline-block);
    height: 30px;
  }
`;
