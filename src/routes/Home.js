import React from "react";
import { useState, useEffect } from "react";
import celestialsJson from "../assets/celestials.json";
function Home() {
  const [searching, setSearching] = useState("");
  const celestials = celestialsJson.celestial;
  return (
    <div>
      <div className="header">
        <div className="systemNav">
          <ul className="solarSystem">solarSystem</ul>
          <ul className="homeGalaxy">homeGalaxy</ul>
        </div>
        <select value="searching">
          {celestials.map((celestial) => (
            <option value={celestial.name}>{celestial.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default Home;
