import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import celestialJson from "../assets/celestials.js";
import "./style.css";
import Headers from "../components/header/Header";
import FullScreenHorizontalScroll from "@groftware/fullscreen-horizontal-scroll";

function CelSlide() {
  const params = useParams();
  const celestialData = celestialJson.filter((cel) => cel.name === params.name);

  return (
    <div>
      <div style={{ border: "10px solid black" }}>
        <div className="slide">
          <h4>{celestialData[0].name}</h4>
          <img
            key={celestialData[0].name}
            value={celestialData[0].name}
            src={celestialData[0].image}
          />
        </div>
      </div>
    </div>
  );
}

export default CelSlide;
