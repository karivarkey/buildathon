import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import "leaflet/dist/leaflet.css";
import News from "./pages/landing/components/news";
import Camps from "./pages/camps/camps";
import ManageCamps from "./pages/ManageCamps";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/news" element={<News />} />
        <Route path="/camps" element={<Camps />} />
        <Route path="/manage-camps" element={<ManageCamps />} />
      </Routes>
    </Router>
  );
};

export default App;
