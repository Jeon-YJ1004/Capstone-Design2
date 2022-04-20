import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CelSlide from "./routes/Slide";
import Home from "./routes/Home";
import "./App.css";
import SolarSystem from "./components/three.js/SolarSystem";

function App() {
  return (
    <div className="App">
      <Router basename="/Capstone-Design2">
        <Routes>
          <Route path="/Capstone-Design2/" element={<Home />} />
          <Route path="/Capstone-Design2/slide" element={<CelSlide />}></Route>
          <Route
            path="/Capstone-Design2/solarSystem"
            element={<SolarSystem />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
