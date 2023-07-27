import React, { useEffect } from "react";
import ActivitiesList from "../components/trips/ActivitiesList";
import BudgetBreakdownGraph from "../components/trips/BudgetBreakdownGraph";
import Collaborators from "../components/trips/Collaborators";
import WeatherBreakdown from "../components/trips/WeatherBreakdown";
import "../css/trip.css";

import {
  fetchImage,
  fetchImageThunk,
  fetchTripThunk,
  fetchWeatherThunk,
} from "../redux/trips/trips.actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Trip() {
  let { tripId } = useParams();
  console.log("params: ", useParams());
  const trip = useSelector((state) => state.trips.singleTrip);
  const dispatch = useDispatch();
  const weatherForecast = useSelector(
    (state) => state.trips.weather.data?.days
  );
  const image = useSelector((state) => state.trips.image.data?.mobile);

  useEffect(() => {
    dispatch(fetchTripThunk(tripId));
  }, []);

  useEffect(() => {
    dispatch(fetchImageThunk(trip.destination));
  }, [trip]);

  console.log("image data: ", image);

  return (
    <div className="background-trip-page">
      <h1>{trip.name}</h1>
      <h2>Owner & Collaborators</h2>
      {trip.collaborators.length > 0 ? (
        <Collaborators />
      ) : (
        <p>No Collaborators...</p>
      )}
      <div className="weather-destination-container">
        <div className="destination-img-container">
          <h1>Destination</h1>
          <img className="destination-img" src={image} alt="placeholder" />
          <h2>{trip.destination}</h2>
        </div>
        <div className="weather-container">
          <h1>Weather</h1>
          <WeatherBreakdown />
          <p>Forecast:</p>
        </div>
      </div>
      <h1>Budget Breakdown</h1>
      <div className="budget-graph-container">
        <BudgetBreakdownGraph className="graph-budget" />
      </div>
      <h1>Activities</h1>
      <ActivitiesList />
      <h1>Travel & Stay</h1>
      <h1>Things to Note</h1>
    </div>
  );
}

export default Trip;
