import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";
import celestialJson from "../../assets/celestials.js";

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

const Headers = (props) => {
  const [renderingSolarSystem, setRenderingSolarSystem] = useState(
    props.solarSystem
  );
  const [controlDistanceState, setControlDistanceState] = useState(true);
  const onChange = (event) => {
    console.log(event.target.value);
    window.location.replace(`/celestial/${event.target.value}`);
  };
  const onClickBtnRenderingPage = () => {
    console.log(renderingSolarSystem);
    if (renderingSolarSystem) {
      console.log("click");
      window.location.replace(`/solarSystem`);
    } else {
      setRenderingSolarSystem(false);
      window.location.replace(`/slide`);
    }
  };
  const onClickBtnControlDistance = () => {};
  return (
    <Positioner>
      <BlackBackground>
        <HeaderContents>
          <button type="button" onClick={onClickBtnRenderingPage}>
            {renderingSolarSystem ? "태양계보기" : "행성보기"}
          </button>

          {renderingSolarSystem ? null : <button>비율바꾸기</button>}
          {/* {children} */}
        </HeaderContents>
      </BlackBackground>
      <GradientBorder />
    </Positioner>
  );
};

export default Headers;

{
  /* <select value={optionState} onChange={onChange}>
            <option>celestials</option>
            {celestialJson.map((celestial) => (
              <option key={celestial.name} value={celestial.name}>
                {celestial.name}
              </option>
            ))}
          </select> */
}
