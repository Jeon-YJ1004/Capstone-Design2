import React from "react";
import { useState, useEffect } from "react";
import celestialsJson from "../assets/celestials.json";
import Header from "../components/Header";
function Home() {
  const celestials = celestialsJson.celestial;
  return (
    <div>
      <Header />
    </div>
  );
}
export default Home;
