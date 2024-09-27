import React from "react";
import Navbar from "../Navbar"; // Import Navbar component
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Polygon, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet styles

const Home = () => {
  // Coordinates for Muvattupuzha, Kerala, India
  const center = [9.9734, 76.5725]; // Muvattupuzha coordinates

  // Polyline and polygon data
  const polyline = [
    [9.9734, 76.5725],
    [9.9744, 76.5735],
    [9.9754, 76.5745],
  ];

  const polygon = [
    [9.9764, 76.5745],
    [9.9774, 76.5755],
    [9.9784, 76.5765],
  ];

  const rectangle = [
    [9.9700, 76.5700],
    [9.9750, 76.5750],
  ];

  const fillBlueOptions = { fillColor: 'blue' };
  const blackOptions = { color: 'black' };
  const limeOptions = { color: 'lime' };
  const purpleOptions = { color: 'purple' };
  const redOptions = { color: 'red' };

  return (
    <>
      <Navbar /> {/* Navbar included */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Map inside a box */}
        <div className="w-3/4 md:w-1/2 p-4 bg-white shadow-lg rounded-lg mb-8">
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
              <Popup>
                Muvattupuzha, Kerala, India
              </Popup>
            </Marker>
            <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
            <Polyline pathOptions={limeOptions} positions={polyline} />
            <Polygon pathOptions={purpleOptions} positions={polygon} />
            <Rectangle bounds={rectangle} pathOptions={blackOptions} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Home;