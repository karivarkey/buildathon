import PenguinMap from "./compoenets/map/map";
const Camps = () => {
  const locations = [
    { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
    { latitude: 40.7128, longitude: -74.006 }, // New York City
    { latitude: 51.5074, longitude: -0.1278 }, // London
    { latitude: -33.8688, longitude: 151.2093 }, // Sydney
  ];

  return (
    <div>
      <h1>Penguin Map</h1>
      <PenguinMap locations={locations} />
    </div>
  );
};

export default Camps;
