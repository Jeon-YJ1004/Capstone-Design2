import { React, useState, useRef, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAdjust } from "@fortawesome/free-solid-svg-icons";

import { Canvas, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import "./slick/slick.css";
import "./slick/slick-theme.css";
import styled from "styled-components";
import Headers from "../components/header/Header";
import Slider from "react-slick";
import celestialJson from "../assets/celestials";
import useInterval from "../hooks/useInterval";
import Earth from "../components/three.js/Earth";
import Loading from "../components/Loading.jsx";

import Planets from "../components/three.js/Planets";
import SolarSystem from "../components/three.js/SolarSystem";
import { Outlet } from "react-router-dom";
import DetailCel from "./DetailCel";

export const StyledSlider = styled(Slider)`
  height: 100%; //슬라이드 컨테이너 영역
  display: flex;
  .slick-list {
    //슬라이드 스크린
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-slide div {
    //슬라이더  컨텐츠
    /* cursor: pointer; */
  }

  .slick-dots {
    //슬라이드의 위치
    bottom: 20px;
    margin-top: 200px;
  }

  .slick-track {
    width: 100%;
  }
`;

export const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
`;
const StyledHeader = styled.div``;
function CelSlide() {
  const [slideProgress, setSlideProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const sliderRef = useRef();
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
    beforeChange: (current, next) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const next = () => {
    setSlideIndex(slideIndex + 1 >= celestialJson.length ? 0 : slideIndex + 1);
    setSlideProgress(0);
    sliderRef.current.slickNext();
  };
  const previous = () => {
    setSlideIndex(slideIndex === 0 ? celestialJson.length - 1 : slideIndex - 1);
    setSlideProgress(0);
    sliderRef.current.slickPrev();
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
    if (e.deltaY < 0) {
      previous();
    } else {
      next();
    }
  };
  useEffect(() => {}, [slideIndex]);
  return (
    <div>
      <StyledHeader>
        <Headers solarSystem={true} />
      </StyledHeader>

      <StyledSlider ref={sliderRef} {...settings}>
        {celestialJson.map((cel) => (
          <CanvasContainer>
            <Canvas
              camera={{
                position: [0, 0, 4000],
                fov: 45,
                near: 1,
                far: 1000000,
              }}
            >
              <Suspense fallback={null}>
                <pointLight intensity={0.4} position={[1000, 0, 1000]} />

                <Stars
                  radius={100000}
                  depth={60}
                  count={20000}
                  factor={7}
                  saturation={0}
                  fade={true}
                />
                <Planets key={cel.name} name={cel.name} />
              </Suspense>
            </Canvas>
          </CanvasContainer>
        ))}
      </StyledSlider>
      <input
        onChange={(e) => sliderRef.current.slickGoTo(e.target.value)}
        value={slideIndex}
        type="range"
        min={0}
        max={celestialJson.length}
      />
      <button
        onClick={() => {
          setIsRunning(!isRunning);
        }}
      >
        {isRunning ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
    </div>
  );
}

export default CelSlide;
