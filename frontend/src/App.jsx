import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import "leaflet/dist/leaflet.css";
import News from "./pages/landing/components/news";
import Camps from "./pages/camps/camps";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/news" element={<News />} />
        <Route path="/camps" element={<Camps />} />
      </Routes>
    </Router>
  );
};

export default App;
