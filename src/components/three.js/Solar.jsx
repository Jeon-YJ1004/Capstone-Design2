import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import styled from "styled-components";
import sunImage from "../../assets/img/8k_sun.jpg";
import close from "../../assets/img/xmark-solid.svg";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function Solar(props) {
  const sunSizeFactor = props.sunRatioReal ? 180 : 400;
  //태양은 행성보다 2배 더 축소됨
  const sunRadius = 695700;
  const sunRotationTime = 609.12;
  const sunMap = useLoader(TextureLoader, sunImage);
  const sunRef = useRef();
  const [modalState, setModalState] = useState(false);
  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current?.show();
    setModalState(true);
  };

  const closeModal = (event) => {
    // event.preventDefault();
    console.log("close");
    setModalState(false);
  };
  useFrame(() => {
    sunRef.current.rotation.y += 1 / sunRotationTime;
  });

  return (
    <>
      {modalState && (
        <ModalBlock>
          <Close onClick={(event) => closeModal(event)} />
          <Contents>
            <Title>Sun</Title>
            <Table>
              <TBody>
                <TRow>
                  <THead scope="row">질량</THead>
                  <TData> 1.988 55 × 10^30 kg</TData>
                </TRow>
                <TRow>
                  <THead scope="row">형태</THead>
                  <TData>G2V형 주계열성</TData>
                </TRow>
                <TRow>
                  <THead scope="row">적도 지름</THead>
                  <TData>1 392 684 ± 130 km</TData>
                </TRow>
                <TRow>
                  <THead scope="row">행성 개수</THead>
                  <TData> 8개</TData>
                </TRow>
                <TRow>
                  <THead scope="row">표면 중력</THead>
                  <TData> m/s^2</TData>
                </TRow>
                <TRow>
                  <THead scope="row">자전주기</THead>
                  <TData>평균 약 27일 6시간</TData>
                </TRow>
                <TRow>
                  <THead scope="row">지구와의 거리</THead>
                  <TData> 1 AU (1억 4,959만 8,023 km)</TData>
                </TRow>
                <TRow>
                  <THead scope="row">표면 온도</THead>
                  <TData> 5500~6000 °C</TData>
                </TRow>
                <TRow>
                  <THead scope="row">나이</THead>
                  <TData>약 45억 6721만 년</TData>
                </TRow>
              </TBody>
            </Table>
          </Contents>
        </ModalBlock>
      )}
      <mesh
        ref={sunRef}
        rotateZ={(7.25 * Math.PI) / 180}
        frustumCulled={false}
        onClick={openModal}
      >
        <sphereGeometry args={[sunRadius / sunSizeFactor, 100, 100]} />
        <meshBasicMaterial map={sunMap} />
      </mesh>
    </>
  );
}
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
