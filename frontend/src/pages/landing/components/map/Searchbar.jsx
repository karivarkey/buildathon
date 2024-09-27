import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SearchBar = () => {
  const [input, setInput] = useState(""); // Holds the search input value
  const [results, setResults] = useState([]); // Holds the search results

  const fetchData = (value) => {
    axios
      .get("https://buildathon.onrender.com/camp/all")
      .then((response) => {
        // Assuming response.data.data is the correct structure
        const json = response.data.data;

        // Log to check if json is an array
        console.log(Array.isArray(json)); // should log true if it's an array

        // Ensure value is not undefined or null
        if (!value) {
          console.error("Search value is undefined or null");
          return;
        }

        // Filter camps based on their name or address
        const filteredResults = json.filter((camp) => {
          // Check if name and address exist before applying toLowerCase
          const nameMatch =
            camp.name &&
            camp.name.toLowerCase().includes(value.toLowerCase());
          const addressMatch =
            camp.address &&
            camp.address.toLowerCase().includes(value.toLowerCase());

          // Return true if either name or address matches
          return nameMatch || addressMatch;
        });

        // Update state with filtered results
        setResults(filteredResults);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value); // Pass the actual input to fetchData
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="input-wrapper flex w-full max-w-md p-3">
        <FaSearch id="search-icon" className="text-blue-500" />
        <input
          className="w-full bg-transparent border-none focus:outline-none text-xl pl-2"
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <SearchResultsList results={results} />
    </div>
  );
};

const SearchResult = ({ result, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className="search-result p-2 border-b cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      {result}
    </div>
  );
};

const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list w-full bg-white shadow-md rounded-lg mt-4 max-h-72 overflow-y-auto">
      {results.map((result, id) => (
        <SearchResult result={result.name} path={result.path || "/"} key={id} />
      ))}
    </div>
  );
};

export default SearchBar;
