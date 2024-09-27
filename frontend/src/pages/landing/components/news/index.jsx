import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../../../components/Navbar/Navbar";
const News = () => {
  const disease = "covid-19";
  const location = "nigeria";
  const reportedCases = 100;
  const deathCases = 10;

  //useEffect use axios to make an api call and use State to store the response.data
  //use the state to display the data

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/latest-epidemics"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="min-h-screen flex justify-between flex-col">
      <div className="p-2">
        <div>
          <div className="font-rubik font-bold text-4xl shadow-2xl p-5 rounded-xl flex w-full justify-between">
            <div>
              <p>{disease.toUpperCase()}</p>
              <h6 className="font-rubic font-light text-lg ">
                {location.toUpperCase()}
              </h6>
            </div>
            <div>
              <div className="flex gap-10">
                <div className="text-center">
                  <h6>{reportedCases}</h6>
                  <h6 className="text-lg text-[#f35900]">REPORTED</h6>
                </div>
                <div className="text-center">
                  <h6>{deathCases}</h6>
                  <h6 className="text-lg text-[#ff0000]">DEATHS</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default News;
