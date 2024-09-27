import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/camp/all")
      .then((res) => {
        setCamps(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(camps);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="font-bold font-rubik text-center p2 shadow-lg text-3xl p-2">
          CAMPS
        </h1>
      </div>
      <Navbar />
      <div className="absolute bottom-16 right-[3px]  transform -translate-x-1/2 -translate-y-1/2 text-lg font-rubik font-semibold rounded-full border-2 p-4 shadow-lg ">
        Refresh
      </div>
    </div>
  );
};

export default ManageCamps;
