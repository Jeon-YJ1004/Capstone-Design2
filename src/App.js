import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CelSlide from "./routes/Slide";
import Home from "./routes/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/celestial/:name`} element={<CelSlide />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
