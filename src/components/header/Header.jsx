import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Suspense } from "react/cjs/react.production.min";

import styled from "styled-components";
import celestialJson from "../../assets/celestials.js";
import SolarSystem from "../three.js/SolarSystem.jsx";

const Headers = (props) => {
  const [renderingSolarSystem, setRenderingSolarSystem] = useState(
    props.solarSystem
  );
  const [controlDistanceState, setControlDistanceState] = useState(true);

  const onClickBtnRenderingPage = () => {
    console.log(renderingSolarSystem);
    if (renderingSolarSystem) {
      console.log("click");
      <Suspense fallback={null}>
        window.location.replace(`/solarSystem`);
      </Suspense>;
    } else {
      setRenderingSolarSystem(false);
      <Suspense fallback={null}>window.location.replace(`/slide`);</Suspense>;
    }
  };

  const onClickBtnControlDistance = () => {
    // if (controlDistanceState) {
    //   <SolarSystem ratio={true} />;
    //   setControlDistanceState(false);
    // } else {
    //   <SolarSystem ratio={false} />;
    //   setControlDistanceState(true);
    // }
  };
  return (
    <Positioner>
      <BlackBackground>
        <HeaderContents>
          <StyledBtn type="button" onClick={onClickBtnRenderingPage}>
            <TopSpan>change screen</TopSpan>
            <BottomSpan>
              {renderingSolarSystem ? "태양계보기" : "행성보기"}
            </BottomSpan>
          </StyledBtn>

          {renderingSolarSystem ? null : (
            <StyledBtn onClick={onClickBtnControlDistance}>
              <TopSpan>change Ratio</TopSpan>
              <BottomSpan>
                {controlDistanceState ? "Real" : "Overstate"}
              </BottomSpan>
            </StyledBtn>
          )}
        </HeaderContents>
      </BlackBackground>
      <GradientBorder />
    </Positioner>
  );
};

export default Headers;

// 상단 고정
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;

  padding: 10px;
  margin-bottom: 10px;

  height: 50px;
`;

//, 내용 중간 정렬
const BlackBackground = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-right: 1rem;
  padding-left: 1rem;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
  height: 3px;
  background: linear-gradient(to right, #868e96, #495057);
`;

const StyledBtn = styled.button`
  display: block;
  position: relative;
  float: left;
  width: 120px;
  padding: 0;
  margin: 10px 20px 10px 0;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  color: #fff;
  border-radius: 5px;
  transition: all 0.2s;
`;
const TopSpan = styled.span`
  position: absolute;
  top: 0px;
  left: 0;
  width: 120px;
  height: 50px;
  background: darkblue;
  z-index: 10;
  transition: all 0.2s;
  border-radius: 5px;
  &:hover {
    top: 40px;
  }
`;
const BottomSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 50px;
  color: #000;
  z-index: 5;
  border-radius: 5px;
`;
