import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

import celestialJson from "../assets/celestials";
import close from "../assets/img/xmark-solid.svg";

function DetailCel(props) {
  const { name, state, closeModal } = props;
  const celestialData = celestialJson.filter((cel) => cel.name === name);
  console.log("detail");

  return state ? (
    <Container>
      <Background onClick={(event) => closeModal(event)} />
      <ModalBlock>
        <Close onClick={(event) => closeModal(event)} />
        <Contents>
          <Title>{celestialData[0].name}</Title>
          <table>
            <tbody>
              <tr>
                <th scope="row">질량</th>
                <td>{celestialData[0].mass} x 10^24 kg</td>
              </tr>
              <tr>
                <th scope="row">편평도</th>
                <td>{celestialData[0].ellipticity}</td>
              </tr>
              <tr>
                <th scope="row">적도 지름</th>
                <td>{celestialData[0].diameter} km</td>
              </tr>
              <tr>
                <th scope="row">평균 밀도</th>
                <td>{celestialData[0].density} g/cm^3</td>
              </tr>
              <tr>
                <th scope="row">표면 중력</th>
                <td>{celestialData[0].gravity} m/s^2</td>
              </tr>
              <tr>
                <th scope="row">자전주기</th>
                <td>{celestialData[0].lengthOfDay} 시간</td>
              </tr>
              <tr>
                <th scope="row">공전주기</th>
                <td>{celestialData[0].orbitalPeriod} 일</td>
              </tr>
              <tr>
                <th scope="row">평균온도</th>
                <td>{celestialData[0].meanTemperature} °C</td>
              </tr>
              <tr>
                <th scope="row">위성 개수</th>
                <td>{celestialData[0].numberOfSatellites} 개</td>
              </tr>
            </tbody>
          </table>
        </Contents>
      </ModalBlock>
    </Container>
  ) : (
    <></>
  );
}
export default React.memo(DetailCel);

DetailCel.propTypes = {
  state: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
const Container = styled(Html)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100vh;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBlock = styled.div`
  position: absolute;
  // top: 6.5rem;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: white;
  width: 60rem;
  @media (max-width: 1120px) {
    width: 50rem;
  }
  @media (max-width: 50rem) {
    width: 80%;
  }
  min-height: 40rem;
  animation: modal-show 1s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const Close = styled.img.attrs({
  src: close,
})`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  width: 20px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div``;
