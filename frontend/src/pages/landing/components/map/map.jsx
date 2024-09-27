import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps"; // Named imports from pigeon-maps
import Navbar from "../../../../components/Navbar/Navbar";
import SearchBar from "./Searchbar";
import axios from "axios"; // Import Axios for making HTTP requests

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

  // Function to handle SOS button click
  const handleSOS = async () => {
    try {
      // Send the user's current location to the backend
      const response = await axios.post("http://localhost:5000/api/sos", {
        location: {
          latitude: userLocation[0],
          longitude: userLocation[1],
        },
      });
      alert("SOS sent!"); // Show an alert on successful SOS send
      console.log(response.data);
    } catch (error) {
      console.error("Error sending SOS:", error);
      alert("Failed to send SOS");
    }
  };

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

      {/* SOS Button */}
      <button
        onClick={handleSOS}
        className="absolute right-4 top-12
         transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
      >
        SOS
      </button>
    </div>
  );
};

export default Maps;
