import { React, useState, useRef, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import { Canvas } from "@react-three/fiber";
import {
  Stars,
  PerspectiveCamera,
  useProgress,
  Html,
  OrbitControls,
} from "@react-three/drei";

import "./slick/slick.css";
import "./slick/slick-theme.css";
import styled from "styled-components";
import Headers from "../components/header/Header";
import Slider from "react-slick";

import celestialJson from "../assets/celestials";
import useInterval from "../hooks/useInterval";
import Loading from "../components/Loading.jsx";

import Planets from "../components/three.js/Planets";
import DetailCel from "../components/DetailCel";
function CelSlide() {
  const [slideProgress, setSlideProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidePrevIndex, setSlidePrevIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const sliderRef = useRef();

  const [cameraX, setCameraX] = useState(-1000);
  const [cameraZ, setCameraZ] = useState(100);
  const [targetZ, setTargetZ] = useState(100);
  const [updateCount, setUpdateCount] = useState(0);
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
  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return (
      <Html as="div" center style={{ color: "white" }}>
        {progress} % loaded
      </Html>
    );
  }

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
    // setCameraX(0 - cameraZ);
    setCameraZ(
      celestialJson.filter((cel) => cel.index === slideIndex)[0]
        .distanceFromSun * 10
    );
    console.log(slideIndex, cameraX, cameraZ, targetZ);
  }, [slideIndex]);
  return (
    <div onWheel={mouseWheel}>
      <Headers solarSystem={true} />

      <StyledSlider ref={sliderRef} {...settings}>
        <CanvasContainer>
          <Canvas concurrent>
            <PerspectiveCamera
              makeDefault
              ref={cameraRef}
              position={[cameraX, 0, cameraZ]}
              fov={45}
              near={1}
              far={100000}
              onUpdate={(self) => self.updateProjectionMatrix()}
            />
            <Suspense fallback={<Loader />}>
              <Stars
                radius={10000}
                depth={60}
                count={20000}
                factor={7}
                saturation={0}
                fade={true}
              />

              {/* <Camera position={[0, 0, 4000]} /> */}
              <pointLight intensity={0.4} position={[1000, 0, 1000]} />

              {celestialJson.map((cel) => (
                <Planets
                  key={cel.name}
                  name={cel.name}
                  doOrbit={false}
                  position={[0, 0, cel.distanceFromSun * 10]}
                  planetRatio={true}
                />
              ))}
            </Suspense>

            <OrbitControls target={[0, 0, targetZ]} />
          </Canvas>
        </CanvasContainer>
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
const CanvasContainer = styled.div`
  width: 100%;
  height: 90vh;
  margin: 0;
  top: 100px;
`;

const StyledSlider = styled(Slider)`
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
