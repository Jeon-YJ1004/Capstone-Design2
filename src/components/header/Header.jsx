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
  // const [controlDistanceState, setControlDistanceState] = useState(true);

  const onClickBtnRenderingPage = () => {
    console.log(renderingSolarSystem);
    if (renderingSolarSystem) {
      window.location.replace(`/solarSystem`);
    } else {
      setRenderingSolarSystem(false);
      window.location.replace(`/slide`);
    }
  };

  const onClickBtnControlRatio = () => {
    if (props.isRatioReal) {
      props.setIsRatioReal(false);
    } else {
      props.setIsRatioReal(true);
    }
  };
  return (
    <Positioner>
      <BlackBackground>
        <HeaderContents>
          <StyledBtn type="button" onClick={onClickBtnRenderingPage}>
            <TopSpan>change screen</TopSpan>
            <BottomSpan>
              {renderingSolarSystem ? "SolarSystem" : "Planets"}
            </BottomSpan>
          </StyledBtn>

          {renderingSolarSystem ? null : (
            <StyledBtn onClick={onClickBtnControlRatio}>
              <TopSpan>change Ratio</TopSpan>
              <BottomSpan>
                {props.isRatioReal ? "Real" : "Overstate"}
              </BottomSpan>
            </StyledBtn>
          )}
        </HeaderContents>
      </BlackBackground>
      {/* <GradientBorder /> */}
    </Positioner>
  );
};

export default Headers;

// 상단 고정
const Positioner = styled.div`
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2;
  padding: 10px;
  margin-bottom: 10px;
`;

//, 내용 중간 정렬
const BlackBackground = styled.div`
  // display: flex;
  // justify-content: center;
  // height: auto;
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
  color: black;
  border-radius: 5px;
  transition: all 0.2s;
`;
const TopSpan = styled.span`
  position: absolute;
  top: 0px;
  left: 0;
  width: 120px;
  height: 50px;
  background: #adff2f;
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
  color: white;
  z-index: 5;
  border-radius: 5px;
`;
