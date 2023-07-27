import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCitiesThunk,
  fetchCities,
} from "../redux/citySearch/citySearch.actions";
import "../css/citySearch.css";

const CitySearch = ({ inputType, onCitySelect }) => {
  const [cityInput, setCityInput] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const filteredSuggestions = useSelector((state) => state.cities.cities);

  const dispatch = useDispatch();

  const handleCityInputChange = async (event) => {
    const value = event.target.value;
    setCityInput(value);
    if (value.trim() !== "") {
      try {
        await dispatch(fetchCitiesThunk(value));
      } catch (error) {
        console.error("Error while fetching cities:", error);
      }
      setIsDropdownVisible(true);
    } else {
      dispatch(fetchCities([]));
      setIsDropdownVisible(false);
    }
  };

  const handleCitySelection = (city) => {
    setCityInput(city.name);
    setIsDropdownVisible(false);
    onCitySelect(city);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          id={`cityInput_${inputType}`}
          value={cityInput}
          onChange={handleCityInputChange}
          onBlur={handleInputBlur}
          autoComplete="off"
        />
        {isDropdownVisible && filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleCitySelection(suggestion)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CitySearch;
