import PenguinMap from "./components/map/map";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
const Camps = () => {
  const [camps, setCamps] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/camp/all");
        console.log(typeof response.data.data);
        const coordinatesArray = response.data.data.map((camp) => ({
          latitude: camp.latitude,
          longitude: camp.longitude,
          name: camp.name,
        }));
        console.log(coordinatesArray);
        setCamps(coordinatesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-h-dvh">
      <PenguinMap locations={camps} />
      <Navbar className="absolute bottom-2 z-30" props="camps" />
    </div>
  );
};

export default Camps;
