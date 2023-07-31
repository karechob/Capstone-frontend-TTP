import axios from "axios";
import TripsActionTypes from "./trips.types";

export const fetchImage = (image) => ({
  type: TripsActionTypes.FETCH_IMAGE,
  payload: image,
});

export const fetchImageThunk = (src) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://capstone-backend-ttp.vercel.app/api/teleport/images/${src.toLowerCase()}`
      );
      dispatch(fetchImage(response));
    } catch (error) {
      console.log("FetchImageThunk Error: ", error);
    }
  };
};
export const fetchWeather = (weather) => ({
  type: TripsActionTypes.FETCH_WEATHER,
  payload: weather,
});

export const fetchWeatherThunk = (destination, x, y) => {
  return async (dispatch) => {
    try {
      console.log("fetchWeatherThunk is firing up");
      console.log("x,y destination: ", x, y);
      const response = await axios.get(
        `https://capstone-backend-ttp.vercel.app/api/weather/getWeather/${destination}/${x}/${y}`
      );
      dispatch(fetchWeather(response));
    } catch (error) {
      console.log("fetchWeatherThunk Error: ", error);
    }
  };
};

export const fetchTrip = (tripData) => ({
  type: TripsActionTypes.FETCH_SINGLE_TRIP,
  payload: tripData,
});

export const fetchTripThunk = (tripId) => {
  return async (dispatch) => {
    try {
      console.log("FETCHINGTRIPTHUNK FIRING UP");
      const response = await axios.get(
        `https://capstone-backend-ttp.vercel.app/api/me/trip/${tripId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(fetchTrip(response.data));
    } catch (error) {
      console.log("single trip thunk error: ", error);
    }
  };
};

// Fetch all trips, associated with logged in user
export const fetchAllTrips = (tripData) => ({
  type: TripsActionTypes.FETCH_TRIPS,
  payload: tripData,
});

// Still need to create Thunk to get all trips from user

export const fetchAllTripsThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://capstone-backend-ttp.vercel.app/api/me/trips`, {
        withCredentials: true,
      });
      // console.log("before dispatch: ", response.data);
      dispatch(fetchAllTrips(response.data));
      //console.log("after dispatch: ", response.data);
    } catch (error) {
      console.error(error);
    }
  };
};

// Adding a trip
export const addTrip = (tripData) => ({
  type: TripsActionTypes.ADD_TRIP,
  payload: tripData,
});

export const addTripThunk = (tripData) => {
  return async (dispatch) => {
    try {
      console.log("ADDTRIPTHUNK IS FIRING UP");
      console.log(tripData);
      const response = await axios.post(
        "https://capstone-backend-ttp.vercel.app/api/me",
        tripData,
        {
          withCredentials: true,
        }
      );
      dispatch(addTrip(response.data));
    } catch (error) {
      console.log("HERE", error);
      console.error(error);
    }
  };
};

// Updating a trip
export const updateTrip = (updateData) => ({
  type: TripsActionTypes.UPDATE_TRIP,
  payload: updateData,
});

export const updateTripThunk = (updateData) => {
  return async (dispatch) => {
    try {
      console.log("updateTripThunk is firing up");
      const response = await axios.put(
        `https://capstone-backend-ttp.vercel.app/api/me/trip`,
        updateData,
        {
          withCredentials: true,
        }
      );
      dispatch(updateTrip(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

// // Deleting a trip
// export const deleteTrip = (deleteData) => ({
//   type: TripsActionTypes.DELETE_TRIP,
//   payload: deleteData,
// });

// export const deleteTripThunk = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:8080/api/trips/${id}`
//       );
//       dispatch(deleteTrip(response.data));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
