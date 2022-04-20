import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

import celestialJson from "../../assets/celestials";
import close from "../../assets/img/xmark-solid.svg";

function DetailCel(props) {
  const { name, state, closeModal } = props;
  const celestialData = celestialJson.filter((cel) => cel.name === name);

  return state ? (
    <ModalBlock position={props.position}>
      <Close onClick={(event) => closeModal(event)} />
      <Contents>
        <Title>{celestialData[0].name}</Title>
        <Table>
          <TBody>
            <TRow>
              <THead scope="row">질량</THead>
              <TData>{celestialData[0].mass} x 10^24 kg</TData>
            </TRow>
            <TRow>
              <THead scope="row">편평도</THead>
              <TData>{celestialData[0].ellipticity}</TData>
            </TRow>
            <TRow>
              <THead scope="row">적도 지름</THead>
              <TData>{celestialData[0].diameter} km</TData>
            </TRow>
            <TRow>
              <THead scope="row">평균 밀도</THead>
              <TData>{celestialData[0].density} g/cm^3</TData>
            </TRow>
            <TRow>
              <THead scope="row">표면 중력</THead>
              <TData>{celestialData[0].gravity} m/s^2</TData>
            </TRow>
            <TRow>
              <THead scope="row">자전주기</THead>
              <TData>{celestialData[0].lengTHeadOfDay} 시간</TData>
            </TRow>
            <TRow>
              <THead scope="row">공전주기</THead>
              <TData>{celestialData[0].orbitalPeriod} 일</TData>
            </TRow>
            <TRow>
              <THead scope="row">평균온도</THead>
              <TData>{celestialData[0].meanTemperature} °C</TData>
            </TRow>
            <TRow>
              <THead scope="row">위성 개수</THead>
              <TData>{celestialData[0].numberOfSatellites} 개</TData>
            </TRow>
          </TBody>
        </Table>
      </Contents>
    </ModalBlock>
  ) : (
    <></>
  );
}
export default React.memo(DetailCel);

DetailCel.propTypes = {
  state: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const ModalBlock = styled(Html)`
  justify-content: center;
  align-items: baseline;
  z-index: 100;
  top: -34vh;
  left: -45vw;
  display: flex;
  border-radius: 20px;
  padding: 1.5rem;
  background-color: rgb(255, 255, 255, 0.99);
  width: 24rem;
  @media (max-width: 1120px) {
    width: 20rem;
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
  padding-top: 1em;
`;

const Table = styled.table`
  width: 100%;
  border: none;
  border-collapse: separate;
  border-spacing: 2px;
`;
const Title = styled.div`
  display: flex;
  margin-bottom: 1em;
  font-size: 30px;
  font-weight: bold;
`;
const TBody = styled.tbody`
  display: table-cell;
  line-height: 2em;
  padding: 0 0.75em;
  border: 1px #adff2f solid;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-width: 2rem;
`;

const THead = styled.th`
  padding: 15px;
  border: none;
  border-bottom: 1px solid #adff2f;
  text-align: center;
  text-shadow: 0 1px #fff;
  vertical-align: middle;
`;

const TRow = styled.tr`
  display: table-row;
`;
const TData = styled.td`
  padding: 15px;
  border: none;
  border-bottom: 1px solid #ddd;
  text-align: left;
  vertical-align: baseline;
`;
