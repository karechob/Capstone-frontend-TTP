import React, { useEffect } from "react";
import ActivitiesList from "../components/trips/ActivitiesList";
import BudgetBreakdownGraph from "../components/trips/BudgetBreakdownGraph";
import Collaborators from "../components/trips/Collaborators";
import WeatherBreakdown from "../components/trips/WeatherBreakdown";
import "../css/trip.css";
import imgplaceholder from "../assets/images/nyc.jpg";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { fetchImage, fetchImageThunk, fetchWeatherThunk } from "../redux/trips/trips.actions";
import { useDispatch, useSelector } from "react-redux";


//page that displays the information generated for one trip
function Trip() {
  const location = useLocation();
  const receivedData = location.state?.tripData;
  const dispatch = useDispatch();
  const weatherForecast = useSelector((state) => state.trips.weather.data?.days);
  // const [search, setSearch] = useState("");
  const image = useSelector((state) => state.trips.image.data?.mobile)
  // console.log("image: " , image);
  
  //Fetches Image for destination
  useEffect(() => {
    dispatch(fetchImageThunk(receivedData.destination));
  }, [receivedData]);

  //Fetch Weather forecast
  useEffect(() => {
    dispatch(fetchWeatherThunk(receivedData.destination));
  }, [receivedData]);

  console.log("received data: ", receivedData);

  return (
    <div className="background-trip-page">
      {/* Trip Name */}
      <h1>{receivedData.name}</h1>
      <h2>Owner & Collaborators</h2>

      {/* Checks if there's any Collaborators */}
      {receivedData.Collaborators > 0 ? (
        <Collaborators />
      ) : (
        <p>No Collaborators...</p>
      )}
      <div className="weather-destination-container">
        <div className="destination-img-container">
          <h1>Destination</h1>
          <img className="destination-img" src={image} alt="placeholder" />
          <h2>{receivedData.destination}</h2>
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
