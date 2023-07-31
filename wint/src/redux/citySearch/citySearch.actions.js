import axios from "axios";
import citiesActionTypes from "./citySearch.types";

export const fetchCities = (cities) => {
  return {
    type: citiesActionTypes.FETCH_CITIES,
    payload: cities,
  };
};

export const fetchCitiesThunk = (cityName, inputType) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://capstone-backend-5zeo9e8f0-karechob.vercel.app/api/citySearch`,
      { name: cityName, type: inputType },
      {
        withCredentials: true,
      }
    );
    const filteredCities = response.data.filter(
      (city) => city.type === inputType
    );
    dispatch(fetchCities(filteredCities));
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
