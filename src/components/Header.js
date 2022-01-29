import React from "react";
import { useState, useEffect } from "react";
import Slide from "../components/Slide";
import celestialsJson from "../assets/celestials.json";
// 헤더에는 천문계 검색바와 사이트 로고가 있다.

function Header() {
  const [searching, setSearching] = useState("");
  const celestials = celestialsJson.celestial;

  const onChange = (e) => {
    setSearching(e.target.value);
  };
  useEffect(() => {});
  return (
    <div>
      <div className="logo">spacize</div>
      <div className="searchBar"></div>
      <select value="searching" onChange={onChange}>
        <option value=""> </option>
        {celestials.map((celestial) => (
          <option value={celestial.name}>{celestial.name}</option>
        ))}
      </select>
      <input
        type="search"
        value={searching}
        placeholder={searching}
        onChange={onChange}
      />
      <Slide celestial={searching} />
    </div>
  );
}
export default Header;
