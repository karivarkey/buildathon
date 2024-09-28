import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import Navbar from "../../../../components/Navbar/Navbar";
import SearchBar from "./Searchbar";
import axios from "axios";
import locationMarker from "./assets/marker.svg";

const Maps = () => {
  const [userLocation, setUserLocation] = useState([40.74157, -73.96851]);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const RADIUS_IN_KM = 1; // Radius of the circle in kilometers
  const CIRCLE_POINTS = 36; // Number of points to create the circle

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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

  const handleSOS = async () => {
    // SOS implementation...
  };

  const mapboxTileProvider = (x, y, z) => {
    return `https://api.mapbox.com/styles/v1/karivarkey/cm1kfdqm700gg01qr0s1716w4/tiles/${z}/${x}/${y}?access_token=pk.eyJ1Ijoia2FyaXZhcmtleSIsImEiOiJjbHE2eGo4MnUwY2ZvMmpueGw3emdheWlsIn0.onksKbtF2ua4Nk8cyoA_JQ`;
  };

  // Function to generate circle coordinates
  const generateCircleCoords = (center, radius, points) => {
    const coords = [];
    const [lat, lng] = center;

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * (2 * Math.PI); // Full circle in radians
      const dx = radius * Math.cos(angle); // Change in x (longitude)
      const dy = radius * Math.sin(angle); // Change in y (latitude)

      // Convert the radius in km to degrees
      const newLat = lat + dy / 110.574; // 1 degree latitude ~ 110.574 km
      const newLng = lng + dx / (111.32 * Math.cos((lat * Math.PI) / 180)); // 1 degree longitude ~ 111.32 km * cos(latitude)

      coords.push([newLat, newLng]);
    }

    return coords;
  };

  // Get the circle coordinates
  const circleCoords = generateCircleCoords(
    userLocation,
    RADIUS_IN_KM,
    CIRCLE_POINTS
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow relative">
        <div className="absolute top-4 left-4 z-10 w-full max-w-md">
          <SearchBar />
        </div>

        <Map
          center={userLocation}
          zoom={18}
          height="100%"
          width="100%"
          provider={mapboxTileProvider}
        >
          <Marker
            anchor={userLocation}
            payload={1}
            onClick={() => alert("You are here!")}
          >
            <img src={locationMarker} alt="Location Marker" />
          </Marker>

          {/* Render the circle using the Line component */}
          <Line
            mapState={{ width: 800, height: 600 }} // Set appropriate dimensions for your map
            latLngToPixel={(coords) => {
              const [lat, lng] = coords;
              // You may need to implement this function based on your map implementation
              // Here is a basic implementation for converting latLng to pixel coordinates:
              const x = ((lng + 180) / 360) * 800; // Adjust these calculations based on your map's scale
              const y = ((90 - lat) / 180) * 600;
              return [x, y];
            }}
            coordsArray={circleCoords} // Pass the generated circle coordinates
            style={{
              stroke: "rgba(255, 0, 0, 0.5)",
              strokeWidth: 2,
              fill: "none",
            }} // Circle style
          />
        </Map>

        <div className="z-10 absolute bottom-0 w-full bg-white">
          <Navbar props="home" />
        </div>

        {!isSOSActive ? (
          <button
            onClick={handleSOS}
            className="absolute right-4 top-12 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none transition-all duration-300 ease-in-out"
          >
            SOS
          </button>
        ) : (
          <div className="fixed flex flex-col items-center gap-20 inset-0 bg-red-500 flex items-center justify-center z-50 transition-all duration-700 ease-in-out">
            <button
              onClick={() => setIsSOSActive(false)}
              className="absolute top-5 left-5 text-white text-4xl font-bold focus:outline-none"
            >
              &times;
            </button>
            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-40 h-40 border-8 border-white rounded-full animate-ping"></div>
                <div className="absolute w-40 h-40 border-8 border-white rounded-full"></div>
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
// Update your Line component with better handling for NaN values
const Line = ({
  mapState: { width, height },
  latLngToPixel,
  coordsArray,
  style = { stroke: "rgb(255,0,0)", strokeWidth: 2, fill: "rgb(50,0,0)" },
}) => {
  if (coordsArray.length < 2) {
    return null;
  }

  const lines = [];
  let pixel = latLngToPixel(coordsArray[0]);

  // Check if the initial pixel value is valid
  if (!isFinite(pixel[0]) || !isFinite(pixel[1])) {
    console.error("First pixel is NaN:", pixel);
    return null; // Avoid rendering lines if the first pixel is invalid
  }

  for (let i = 1; i < coordsArray.length; i++) {
    const pixel2 = latLngToPixel(coordsArray[i]);

    // Ensure the second pixel is valid before drawing the line
    if (!isFinite(pixel2[0]) || !isFinite(pixel2[1])) {
      console.error("Second pixel is NaN:", pixel2);
      continue; // Skip drawing this line segment if pixel is invalid
    }

    lines.push(
      <line
        key={i}
        x1={pixel[0]}
        y1={pixel[1]}
        x2={pixel2[0]}
        y2={pixel2[1]}
        style={style}
      />
    );
    pixel = pixel2;
  }

  return (
    <svg
      width={width}
      height={height}
      style={{ top: 0, left: 0, position: "absolute", pointerEvents: "none" }}
    >
      {lines}
    </svg>
  );
};

// Improve latLngToPixel function to handle edge cases
const latLngToPixel = (coords) => {
  const [lat, lng] = coords;
  if (lat == null || lng == null) {
    return [NaN, NaN]; // Return NaN for invalid coordinates
  }
  const x = ((lng + 180) / 360) * width; // Adjust these calculations based on your map's scale
  const y = ((90 - lat) / 180) * height;

  return [x, y];
};

export default Maps;
