import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../../components/Navbar/Navbar";

const News = () => {
  const disease = "covid-19"; // Disease to fetch news about
  const location = "nigeria"; // Location for the news
  const reportedCases = 100; // Example static data for reported cases
  const deathCases = 10; // Example static data for death cases

  // State to store news articles
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API call to the News API
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "Endemic, Epidemic, Pandemic, Health Crisis", // Search query
            language: "en", // Language parameter
            apiKey: "5e0769b62ed044efa93bee69c0042e86", // Your News API key
          },
        });

        // Set articles in state
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [disease]); // Dependency array to refetch if the disease changes

  console.log(articles); // Log articles for debugging

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ maxHeight: "max(dvh, 100vh)" }}
    >
      <div className="flex-1 p-2 overflow-hidden">
        {" "}
        {/* Allow scrolling in this area */}
        <div className="font-rubik font-bold text-4xl shadow-2xl p-5 rounded-xl flex w-full justify-between">
          <div>
            <p>{disease.toUpperCase()}</p>
            <h6 className="font-rubik font-light text-lg ">
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
        {/* Render news articles */}
        <div className="mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {" "}
          {/* Make this div scrollable */}
          <h2 className="text-2xl font-bold overflow-y-hidden">
            Latest Articles
          </h2>
          <div className="mt-2">
            {articles.length > 0 ? (
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
      <div className="absolute bottom-0 w-full">
        {" "}
        {/* Use relative positioning */}
        <Navbar /> {/* Always visible at the bottom */}
      </div>
    </div>
  );
};

export default News;
