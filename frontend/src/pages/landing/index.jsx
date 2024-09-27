import Map from "./components/map/map";
import Navbar from "./components/Navbar.jsx";

export const Landing = () => {
  return (
    <div className="relative h-screen w-screen">
      {/* Fullscreen map */}
      <Map />
      
      {/* Navbar positioned at the bottom */}
      <Navbar />
    </div>
  );
}

export default Landing;
