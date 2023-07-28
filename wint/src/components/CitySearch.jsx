import React, { useState, useEffect, useRef } from "react";
import "../css/citySearch.css";

const CitySearch = ({ onCitySelect }) => {
  const [cityInput, setCityInput] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef();
  let debounceTimeout;

  useEffect(() => {
    if (citySuggestions.length > 0) {
      setFilteredSuggestions(citySuggestions.slice(0, 5));
    }
  }, [citySuggestions]);

  useEffect(() => {
    if (selectedCity) {
      setCityInput(selectedCity.name);
    } else {
      setCityInput("");
    }
  }, [selectedCity]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setFilteredSuggestions([]);
    }
  };

  const handleCityInputChange = (event) => {
    const value = event.target.value;
    setCityInput(value);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchSuggestions(value);
    }, 100);
  };

  const fetchSuggestions = async (city) => {
    try {
      setError(null);
      const response = await fetch(
        `https://api.teleport.org/api/cities/?search=${encodeURIComponent(
          city
        )}`
      );
      const data = await response.json();
      const suggestions = data._embedded["city:search-results"].map((item) => {
        if (item.matching_alternate_names && item.matching_alternate_names[0]) {
          return {
            name: item.matching_alternate_names[0].name,
          };
        }
        return null;
      });
      setCitySuggestions(
        suggestions.filter((suggestion) => suggestion !== null)
      );
    } catch (error) {
      setError("Error fetching city suggestions");
      setCitySuggestions([]);
    }
  };

  const handleCitySelection = (city) => {
    if (city) {
      setSelectedCity(city);
      setFilteredSuggestions([]);
      onCitySelect(city);
    }
  };

  const handleClearInput = () => {
    setCityInput("");
    setCitySuggestions([]);
    setSelectedCity(null);
    setFilteredSuggestions([]);
    onCitySelect(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (filteredSuggestions.length > 0) {
        handleCitySelection(filteredSuggestions[0]);
      }
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (filteredSuggestions.length > 0) {
        const currentIndex = filteredSuggestions.findIndex(
          (suggestion) => suggestion.name === cityInput
        );
        const nextIndex =
          event.key === "ArrowDown"
            ? (currentIndex + 1) % filteredSuggestions.length
            : (currentIndex - 1 + filteredSuggestions.length) %
              filteredSuggestions.length;
        setCityInput(filteredSuggestions[nextIndex].name);
      }
    }
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <div className="search-bar" ref={inputRef}>
          <input
            type="text"
            id="cityInput"
            value={cityInput}
            onChange={handleCityInputChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            required
          />
          {error && <div>{error}</div>}
          {filteredSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleCitySelection(suggestion)}>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedCity && (
          <button className="clear-button" onClick={handleClearInput}></button>
        )}
      </div>
    </div>
  );
};

export default CitySearch;
