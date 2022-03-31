import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CelSlide from "./routes/Slide";
import Home from "./routes/Home";
import Earth from "./components/three.js/Earth";
import "./App.css";
import SolarSystem from "./components/three.js/SolarSystem";
import DetailCel from "./routes/DetailCel";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="slide/*" element={<CelSlide />}></Route>
          <Route path="solarSystem" element={<SolarSystem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
