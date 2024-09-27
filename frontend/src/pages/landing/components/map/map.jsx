import React from "react";
import { Map, Marker, Overlay } from "pigeon-maps"; // Named imports from pigeon-maps
import Navbar from "../../../../components/Navbar/Navbar";
const Maps = () => {
  return (
    <div className="min-h-screen">
    
    
      <Map
        center={[40.74157, -73.96851]} // Coordinates for map center
        zoom={12} // Initial zoom level
        height="93vh" // Make the map take up 100% height of the parent
        width="100%" // Ensure full width as well
      >
        {/* Example Marker */}
        <Marker
          anchor={[40.74157, -73.96851]}
          payload={1}
          onClick={() => alert("Marker clicked!")}
        />



      </Map>
      <div className="h-max ">
        <Navbar />
      </div>
    </div>
  );
};

export default Maps;
