import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CustomModal from "../modal/popup";
import React from "react";

// Import your custom SVG marker
import customMarkerSVG from "../../assets/marker.svg"; // Adjust the path as necessary

// Component to fit map bounds
const FitBounds = ({ locations }) => {
  const map = useMap();

  // Create an array of positions from locations
  const positions = locations.map((location) => [
    location.latitude,
    location.longitude,
  ]);

  if (positions.length > 0) {
    const bounds = L.latLngBounds(positions); // Create bounds from positions
    map.fitBounds(bounds); // Automatically fit the map to the bounds
  }

  return null; // No rendering required
};

const PenguinMap = ({ locations }) => {
  const defaultPosition = [0, 0];
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  // Create a custom icon using the SVG
  const customMarkerIcon = L.divIcon({
    className: "custom-icon", // Custom class name
    html: `<img src="${customMarkerSVG}" alt="Marker" style="width: 30px; height: 30px;" />`, // Your SVG as a marker
    iconSize: [30, 30], // Size of the icon
    iconAnchor: [15, 30], // Adjust the anchor point
  });

  // Check if locations are empty
  if (!locations || locations.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Locations Available</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <>
      {/* Conditionally render the map */}
      {!modalOpen && (
        <MapContainer
          center={defaultPosition}
          zoom={2}
          style={{ height: "92vh", width: "100%" }}
          touchZoom={true}
          dragging={true}
        >
          <TileLayer
            // Use Mapbox custom tiles URL with your custom style ID
            url="https://api.mapbox.com/styles/v1/karivarkey/cm1kfdqm700gg01qr0s1716w4/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FyaXZhcmtleSIsImEiOiJjbHE2eGo4MnUwY2ZvMmpueGw3emdheWlsIn0.onksKbtF2ua4Nk8cyoA_JQ"
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
            tileSize={512}
            zoomOffset={-1}
          />
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              icon={customMarkerIcon} // Use the custom SVG marker
              eventHandlers={{
                click: () => handleMarkerClick(location),
              }}
            />
          ))}
          <FitBounds locations={locations} />{" "}
          {/* Fit map bounds to the markers */}
        </MapContainer>
      )}

      <CustomModal
        isOpen={modalOpen}
        onClose={closeModal}
        location={selectedLocation}
      />
    </>
  );
};

export default PenguinMap;
