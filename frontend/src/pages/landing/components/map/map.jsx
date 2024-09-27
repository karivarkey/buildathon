
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Replace this with your custom icon path if needed
const customIcon = new L.Icon({
  iconUrl: 'path/to/your/icon.png', // Replace with your icon path if desired
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[40.74157, -73.96851]} // Center the map on your desired location
        zoom={13} // Set initial zoom level
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/karivarkey/cm1kfdqm700gg01qr0s1716w4/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FyaXZhcmtleSIsImEiOiJjbHE2eGo4MnUwY2ZvMmpueGw3emdheWlsIn0.onksKbtF2ua4Nk8cyoA_JQ" // Replace with your style URL
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <Marker position={[40.74157, -73.96851]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
