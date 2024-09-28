import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import Navbar from "../../../../components/Navbar/Navbar";
import SearchBar from "./Searchbar";
import axios from "axios";
import locationMarker from "./assets/marker.svg";

const Maps = () => {
  const [userLocation, setUserLocation] = useState([40.74157, -73.96851]);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [circles, setCircles] = useState([]); // To hold circle data fetched from API

  useEffect(() => {
    // Get user location
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

    // Fetch circle data from API
    fetchCircleData();
  }, []);

  // Function to fetch circle data from the API
  const fetchCircleData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/alerts"); // Change URL as needed
      setCircles(response.data); // Assuming response.data is the array of circles
    } catch (error) {
      console.error("Error fetching circle data:", error);
    }
    console.log(circles);
  };

  const handleSOS = async () => {
    try {
      console.log(userLocation);
      // Send the user's current location to the backend
      const response = await axios.post("http://localhost:3001/api/sos", {
        latitude: userLocation[0],
        longitude: userLocation[1],
      });
      alert("SOS sent!"); // Show an alert on successful SOS send
      console.log(response.data);
      setIsSOSActive(true);
    } catch (error) {
      console.error("Error sending SOS:", error);
      alert("Failed to send SOS");
    }
  };

  const mapboxTileProvider = (x, y, z) => {
    return `https://api.mapbox.com/styles/v1/karivarkey/cm1kfdqm700gg01qr0s1716w4/tiles/${z}/${x}/${y}?access_token=pk.eyJ1Ijoia2FyaXZhcmtleSIsImEiOiJjbHE2eGo4MnUwY2ZvMmpueGw3emdheWlsIn0.onksKbtF2ua4Nk8cyoA_JQ`;
  };

  // Function to generate circle coordinates
  const generateCircleCoords = (center, radius, points = 36) => {
    const coords = [];
    const [lat, lng] = center;

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * (2 * Math.PI);
      const dx = radius * Math.cos(angle);
      const dy = radius * Math.sin(angle);

      const newLat = lat + dy / 110.574; // 1 degree latitude ~ 110.574 km
      const newLng = lng + dx / (111.32 * Math.cos((lat * Math.PI) / 180)); // 1 degree longitude ~ 111.32 km * cos(latitude)

      coords.push([newLat, newLng]);
    }

    return coords;
  };

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

          {/* Render circles based on fetched data */}
          {circles.map((circle, index) => {
            const circleCoords = generateCircleCoords(
              [circle.lattitude, circle.longitude],
              circle.radius
            );

            return (
              <Circle
                key={index}
                mapState={{ width: 800, height: 600 }}
                latLngToPixel={(coords) => {
                  const [lat, lng] = coords;
                  const x = ((lng + 180) / 360) * 800;
                  const y = ((90 - lat) / 180) * 600;
                  return [x, y];
                }}
                coordsArray={circleCoords}
                style={{
                  fill: "rgba(0, 0, 255, 0.2)", // Blue color fill with some transparency
                  stroke: "rgba(0, 0, 255, 0.5)", // Stroke color for the circle
                  strokeWidth: 2,
                }}
              />
            );
          })}
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

// Circle component to render filled circles
const Circle = ({
  mapState: { width, height },
  latLngToPixel,
  coordsArray,
  style,
}) => {
  if (coordsArray.length < 2) return null;

  const path =
    coordsArray
      .map((coord, index) => {
        const [x, y] = latLngToPixel(coord);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ") + " Z"; // Close the path

  return (
    <svg
      width={width}
      height={height}
      style={{ top: 0, left: 0, position: "absolute", pointerEvents: "none" }}
    >
      <path d={path} style={style} />
    </svg>
  );
};

export default Maps;
