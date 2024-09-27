import { useState } from "react";

const News = () => {
  // States to store information about disease, cases, deaths, and suggested cures
  const [diseaseName, setDiseaseName] = useState("Influenza");
  const [cases, setCases] = useState(15000);
  const [deaths, setDeaths] = useState(250);
  const [cures, setCures] = useState([
    { id: 1, text: "Rest and fluids" },
    { id: 2, text: "Antiviral medication" },
    { id: 3, text: "Fever reducers" },
  ]);

  return (
    <div className="bg-white w-full max-w-4xl mx-auto my-8 p-6 shadow-lg rounded-lg">
      {/* Header */}
      <div className="bg-white w-full py-4 shadow-md mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Disease Outbreak Report
        </h1>
      </div>

      {/* Disease Information */}
      <div className="text-gray-800 text-lg mb-4">
        <p><strong>Disease Name:</strong> {diseaseName}</p>
        <p><strong>Number of Cases:</strong> {cases}</p>
        <p><strong>Number of Deaths:</strong> {deaths}</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cures.map((cure) => (
          <div
            key={cure.id}
            className="p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <p className="text-gray-700 text-center">{cure.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;