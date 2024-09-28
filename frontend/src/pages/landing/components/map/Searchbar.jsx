import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SearchBar = () => {
  const [input, setInput] = useState(""); // Holds the search input value
  const [results, setResults] = useState([]); // Holds the search results
  const [isActive, setIsActive] = useState(false); // Tracks if the search bar is expanded

  const fetchData = async (value) => {
    try {
      const response = await axios.get("http://localhost:3001/camp/all");
      const camps = response.data.data || [];

      // Filter camps based on name or address (both case-insensitive)
      const filteredResults = camps.filter((camp) => {
        const nameMatch = camp.name
          ?.toLowerCase()
          .includes(value.toLowerCase());
        const addressMatch = camp.address
          ?.toLowerCase()
          .includes(value.toLowerCase());
        return nameMatch || addressMatch;
      });

      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      setResults([]); // Clear results when input is empty
    } else {
      fetchData(value); // Trigger search when there's input
    }
  };

  const handleClick = () => {
    setIsActive(true); // Stay expanded on click
  };

  const handleBlur = () => {
    if (input.trim() === "") {
      setIsActive(false); // Retract when input is empty
    }
  };

  return (
    <div
      className={`fixed top-4 left-4 transition-all duration-300 ease-in-out ${
        isActive ? "w-2/3" : "w-12"
      } hover:w-2/3`} // Expand on hover
      style={{
        zIndex: 10, // Ensure it's above other content
      }}
    >
      <div
        className={`flex items-center bg-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out ${
          isActive ? "w-full" : "w-12"
        }`}
        onClick={handleClick} // Keep expanded on click
      >
        <FaSearch className="text-blue-500" />

        {/* Input is visible only when active */}
        <input
          type="text"
          className={`transition-all duration-300 ease-in-out ${
            isActive
              ? "w-full opacity-100 pl-3"
              : "w-0 opacity-0 pointer-events-none"
          } bg-transparent border-none focus:outline-none text-lg`}
          placeholder="Search by camp name or address..."
          value={input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {/* Render results if there are any */}
      {results.length > 0 && <SearchResultsList results={results} />}
    </div>
  );
};

const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to a detailed page for this camp, assuming there's a camp detail route
    navigate(`/camp/${result._id}`);
  };

  return (
    <div
      className="search-result p-2 border-b cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <h2 className="font-semibold">{result.name}</h2>
      <p className="text-gray-600">{result.address}</p>
    </div>
  );
};

const SearchResultsList = ({ results }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg mt-4 max-h-72 overflow-y-auto">
      {results.map((result) => (
        <SearchResult key={result._id} result={result} />
      ))}
    </div>
  );
};

export default SearchBar;
