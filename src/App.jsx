import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CelSlide from "./components/Slide";
import Home from "./routes/Home";
import DetailCel from "./routes/DetailCel";
import Earth from "./components/three.js/Earth";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/celestial/:name`} element={<DetailCel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
