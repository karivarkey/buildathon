import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps"; // Named imports from pigeon-maps
import Navbar from "../../../../components/Navbar/Navbar";
import SearchBar from "./Searchbar";

const Maps = () => {
  // State to hold user's current location
  const [userLocation, setUserLocation] = useState([40.74157, -73.96851]); // Default coordinates (fallback)

  // Use useEffect to fetch the user's location when the component mounts
  useEffect(() => {
    // Check if browser supports geolocation
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Update the state with the user's coordinates
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="relative max-h-16">
      {/* Wrapping SearchBar with a div to apply absolute positioning */}
      <div className="absolute top-4 left-4 z-10 w-full max-w-md">
        <SearchBar />
      </div>

      <Map
        center={userLocation} // Use user's current location as the center
        zoom={18} // Initial zoom level
        height="93vh" // Make the map take up 100% height of the parent
        width="100%" // Ensure full width as well
      >
        {/* User's current location marker */}
        <Marker
          anchor={userLocation} // Pin location is user's current location
          payload={1}
          onClick={() => alert("You are here!")}
        />
      </Map>

      <div className="h-max">
        <Navbar />
      </div>
    </div>
  );
};

export default Maps;
