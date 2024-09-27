import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import 'leaflet/dist/leaflet.css';
import News from './pages/landing/components/news';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/news" element={<News/>} />
      </Routes>
    </Router>
  );
}

export default App;
