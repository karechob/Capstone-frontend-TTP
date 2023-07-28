import React, { useEffect } from "react";
import ActivitiesList from "../components/trips/ActivitiesList";
import BudgetBreakdownGraph from "../components/trips/BudgetBreakdownGraph";
import Collaborators from "../components/trips/Collaborators";
import WeatherBreakdown from "../components/trips/WeatherBreakdown";
import "../css/trip.css";
import defaultpic1 from "../assets/avatars/dogGlasses.png";
import PlaceholderActivity from "../assets/images/little-island.jpg";
// import defaultpic2 from "../../assets/avatars/djAvi.png";
// import defaultpic3 from "../../assets/avatars/appleDog.png";

import {
  fetchImageThunk,
  fetchTripThunk,
  fetchWeatherThunk,
  fetchCollaboratorThunk,
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
  const startDate = trip.startDate?.split("T")[0];
  const endDate = trip.endDate?.split("T")[0];
  console.log("start date: ", startDate);
  console.log("end date: ", endDate);
  console.log("trip: ", trip);
  console.log("weather: ", weatherForecast);
  useEffect(() => {
    dispatch(fetchTripThunk(tripId));
  }, []);

  useEffect(() => {
    dispatch(fetchImageThunk(trip.destination));
  }, [trip]);
  
  // useEffect(() => {
  //   if(trip){
  //   dispatch(fetchWeatherThunk(trip.destination, startDate, endDate));
  //   };
  // }, [trip]);

  useEffect(() => {
    dispatch(fetchWeatherThunk(trip.destination, startDate, endDate));
  }, [])


  //Get the total temperature for the trip and average
  const totalTemp =
    weatherForecast?.reduce((sum, day) => sum + day.temp, 0) || 0;
  const averageTemp = weatherForecast?.length
    ? totalTemp / weatherForecast.length
    : 0;

  // Render the JSX outside the useEffect hooks
  return (
    <div className="background-trip-page">
      <h1>{trip.name}</h1>
      <h2>Owner & Collaborators</h2>
      <div className="collaborators-container">
        {!!trip.collaborators ? (
          trip.collaborators.map((collaborator) => {
            return (
              <div className="collaborator-image">
                <img
                  className="collaborator-indiv-img"
                  src={defaultpic1}
                  alt="default-pic"
                />
                <h2>{collaborator.username}</h2>
                <h3>Budget: {collaborator.budget}</h3>
              </div>
            );
          })
        ) : (
          <p>No Collaborators...</p>
        )}
      </div>
      <div className="weather-destination-container">
        <div className="destination-img-container">
          <h1>Destination</h1>
          <img className="destination-img" src={image} alt="placeholder" />
          <h2>{trip.destination}</h2>
        </div>
        <div className="weather-container">
          <h1>Weather</h1>
          <WeatherBreakdown />
          <p>Average Temperature:</p>
          <p>{averageTemp.toFixed(2)}°C</p>
        </div>
      </div>
      <h1>Budget Breakdown</h1>
      <div className="budget-graph-container">
        <BudgetBreakdownGraph className="graph-budget" />
      </div>
      <h1>Activities</h1>
      <div className="activities-list-container">
        {trip.activities?.map((activity) => {

        return(
      <div className="act-list-item">
        <div className="activity-img-container">
          <img
            className="activity-img"
            src={PlaceholderActivity}
            alt="Activity"
          />
        </div>
        <div className="activity-info">
          <h1>ActivityName: {activity.name}</h1>
          <h2>Budget: ${activity.cost}</h2>
          <h2>Link to place googlemaps</h2>
        </div>
      </div>
        );
        })}
      </div>
      <h1>Travel & Stay</h1>
      <h1>Things to Note</h1>
    </div>
  );
}

 export default Trip;
