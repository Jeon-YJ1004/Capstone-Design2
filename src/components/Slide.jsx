import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import celestialJson from "../assets/celestials.js";

function CelSlide(props) {
  const celestialData = celestialJson.filter((cel) => cel.name === props.name);
  const onClick = () => {
    // window.location.replace(`/celestial/${props}`);
  };
  // console.log(props.name);
  return (
    <div>
      <div style={{ border: "10px solid black" }}>
        <div className="slide">
          <h4 onClick={onClick}>{celestialData[0].name}</h4>
          <img
            onClick={onClick}
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
