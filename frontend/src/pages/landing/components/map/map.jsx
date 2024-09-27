import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps"; // Import Pigeon Maps
import Navbar from "../../../../components/Navbar/Navbar"; // Import Navbar
import SearchBar from "./Searchbar"; // Import Search Bar
import axios from "axios"; // Import Axios for making HTTP requests
import locationMarker from "./assets/marker.svg"; // Import Marker Image

const Maps = () => {
  // State to hold user's current location
  const [userLocation, setUserLocation] = useState([40.74157, -73.96851]); // Default coordinates (fallback)
  const [isSOSActive, setIsSOSActive] = useState(false); // State to handle SOS button click

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
      const response = await axios.post("http://localhost:3001/api/sos", {
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

    // Trigger full-screen SOS animation
    setIsSOSActive(true);
  };

  // Custom tile provider for Mapbox
  const mapboxTileProvider = (x, y, z) => {
    return `https://api.mapbox.com/styles/v1/karivarkey/cm1kfdqm700gg01qr0s1716w4/tiles/${z}/${x}/${y}?access_token=pk.eyJ1Ijoia2FyaXZhcmtleSIsImEiOiJjbHE2eGo4MnUwY2ZvMmpueGw3emdheWlsIn0.onksKbtF2ua4Nk8cyoA_JQ`;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}

      {/* Map Container */}
      <div className="flex-grow relative">
        <div className="absolute top-4 left-4 z-10 w-full max-w-md">
          <SearchBar />
        </div>

        <Map
          center={userLocation} // Use user's current location as the center
          zoom={18} // Initial zoom level
          height="100%" // Make the map take up 100% height of the parent
          width="100%" // Ensure full width as well
          provider={mapboxTileProvider} // Use custom Mapbox tiles via tileProvider
        >
          <Marker
            anchor={userLocation} // Pin location is user's current location
            payload={1}
            onClick={() => alert("You are here!")} // Event handler for marker click
          >
            <img src={locationMarker} alt="Location Marker" />
          </Marker>
        </Map>
        <div className="z-10 absolute bottom-0 w-full bg-white">
          <Navbar props="home" />
        </div>

        {/* SOS Button and Fullscreen SOS Overlay */}
        {!isSOSActive ? (
          <button
            onClick={handleSOS}
            className="absolute right-4 top-12 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none transition-all duration-300 ease-in-out"
          >
            SOS
          </button>
        ) : (
          <div className="fixed flex flex-col items-center gap-20 inset-0 bg-red-500 flex items-center justify-center z-50 transition-all duration-700 ease-in-out">
            {/* Close Button */}
            <button
              onClick={() => setIsSOSActive(false)} // Close SOS screen on click
              className="absolute top-5 left-5 text-white text-4xl font-bold focus:outline-none"
            >
              &times; {/* This is the "X" (cross) symbol */}
            </button>

            <div className="flex flex-col gap-5 justify-center items-center">
              {/* Outer Ring */}
              <div className="relative flex items-center justify-center">
                {/* Animated Ring */}
                <div className="absolute w-40 h-40 border-8 border-white rounded-full animate-ping"></div>

                {/* Static Ring */}
                <div className="absolute w-40 h-40 border-8 border-white rounded-full"></div>

                {/* SOS Text and Message */}
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-white text-6xl font-bold animate-pulse">
                    SOS
                  </h1>
                </div>
              </div>
            </div>
            <h6 className="text-white text-xl font-semibold animate-pulse">
              Contacting the Authorities ASAP
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
