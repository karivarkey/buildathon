import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../../components/Navbar/Navbar";
import { ThreeDots } from "react-loader-spinner"; // Import specific loader component

const News = () => {
  const [articles, setArticles] = useState([]); // State to store news articles
  const [loading, setLoading] = useState(true); // State for loading
  const [currentDisease, setCurrentDisease] = useState(""); // Current selected disease
  const [affectedCases, setAffectedCases] = useState(0); // Affected cases
  const [mortalityRate, setMortalityRate] = useState(0); // Mortality rate

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        // Fetch the disease with the largest number of cases
        const diseaseResponse = await axios.get(
          "http://localhost:3001/disease/largest"
        );

        // Set the current disease details
        if (diseaseResponse.data && diseaseResponse.data.data) {
          const mostCasesDisease = diseaseResponse.data.data; // Get the disease data
          setCurrentDisease(mostCasesDisease.name); // Set the disease name
          setAffectedCases(mostCasesDisease.number); // Set affected cases
          setMortalityRate(mostCasesDisease.mortality); // Set mortality rate
        }

        // Fetch articles
        const newsResponse = await axios.get(
          "https://newsapi.org/v2/everything",
          {
            params: {
              q: "Endemic, Epidemic, Pandemic, Health Crisis", // Search query
              language: "en", // Language parameter
              apiKey: "5e0769b62ed044efa93bee69c0042e86", // Your News API key
            },
          }
        );

        // Set articles in state
        setArticles(newsResponse.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ maxHeight: "max(dvh, 100vh)" }}
    >
      <div className="flex-1 p-2 overflow-hidden">
        {/* Allow scrolling in this area */}
        <div className="font-rubik font-bold text-4xl shadow-2xl p-5 rounded-xl flex w-full justify-between">
          <div>
            <p className="text-2xl font-bold">{currentDisease.toUpperCase()}</p>{" "}
            {/* Display current disease */}
            <h6 className="font-rubik font-light text- "></h6>
          </div>
          <div>
            <div className="flex gap-10 text-md">
              <div className="text-center">
                <h6 className="text-md">{affectedCases}</h6>{" "}
                {/* Display affected cases */}
                <h6 className="text-sm text-[#f35900]">REPORTED</h6>
              </div>
              <div className="text-center">
                <h6 className="text-md">{(mortalityRate * 100).toFixed(2)}%</h6>{" "}
                {/* Display mortality rate as a percentage */}
                <h6 className="text-sm text-[#ff0000]">MORTALITY RATE</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Render loading animation or news articles */}
        <div className="mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {/* Make this div scrollable */}
          <h2 className="text-2xl font-bold overflow-y-hidden">
            Latest Articles
          </h2>
          <div className="mt-2">
            {loading ? ( // Show loading animation while fetching
              <div className="flex items-center justify-center h-40">
                <ThreeDots color="#000000" height={80} width={80} />
                {/* Using ThreeDots component */}
              </div>
            ) : articles.length > 0 ? (
              articles.map((article, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded-lg shadow-md"
                >
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  <p className="text-sm">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                </div>
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-white">
        {/* Use relative positioning */}
        <Navbar props="news" /> {/* Always visible at the bottom */}
      </div>
    </div>
  );
};

export default News;
