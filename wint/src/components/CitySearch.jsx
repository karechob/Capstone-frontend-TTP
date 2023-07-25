import React, { useState, useEffect } from "react";
import "../css/citySearch.css";

const CitySearch = ({ onCitySelect }) => {
  const [cityInput, setCityInput] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (citySuggestions.length > 0) {
      setFilteredSuggestions(citySuggestions.slice(0, 10));
    }
  }, [citySuggestions]);

  const handleCityInputChange = async (event) => {
    const value = event.target.value;
    setCityInput(value);

    try {
      const suggestions = await fetchCitySuggestions(value);
      setCitySuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setCitySuggestions([]);
    }
  };

  const handleCitySelection = (city) => {
    setCityInput(city);
    setFilteredSuggestions([]);
    onCitySelect(city);
  };

  const handleFilterSuggestions = (searchText) => {
    const filtered = citySuggestions.filter((city) =>
      city.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSuggestions(filtered.slice(0, 10));
  };

  async function fetchCitySuggestions(city) {
    try {
      const response = await fetch(
        `https://api.teleport.org/api/cities/?search=${encodeURIComponent(
          city
        )}`
      );
      const data = await response.json();

      console.log("API Response:", data); // Add this log to see the API response

      const suggestions = data._embedded["city:search-results"].map(
        (item) => item.matching_full_name
      );
      return suggestions;
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      return [];
    }
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          id="cityInput"
          value={cityInput}
          onChange={handleCityInputChange}
          onFocus={() => setFilteredSuggestions(citySuggestions.slice(0, 10))}
          onBlur={() => setFilteredSuggestions([])}
          required
        />
        {filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleCitySelection(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CitySearch;
