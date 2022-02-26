import React from "react";
import { Link } from "react-router-dom";

import Headers from "../components/header/Header";
// import CelSlide from "../components/Slide";

function Home() {
  return (
    <div>
      <h1>Size of Celestial</h1>

      <button>
        <Link to="celestial/Earth">click me</Link>
      </button>
    </div>
  );
}

export default Home;
