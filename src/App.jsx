import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CelSlide from "./routes/Slide";
import Home from "./routes/Home";
import "./App.css";
import SolarSystem from "./components/three.js/SolarSystem";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Capstone-Design2" element={<Home />} />
          <Route path="slide" element={<CelSlide />}></Route>
          <Route path="solarSystem" element={<SolarSystem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
