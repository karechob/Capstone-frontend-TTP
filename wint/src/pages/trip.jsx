import React from "react";
import ActivitiesList from "../components/trips/ActivitiesList";
import BudgetBreakdownGraph from "../components/trips/BudgetBreakdownGraph";
import Collaborators from "../components/trips/Collaborators";
import WeatherBreakdown from "../components/trips/WeatherBreakdown";
import "../css/trip.css";
import imgplaceholder from "../pictures/nyc.jpg";

//page that displays the information generated for one trip
function trip() {
  return (
    <div className="background-trip-page">
      <h1>Owner & Collaborators</h1>
      <Collaborators />
      <div className="weather-destination-container">
        <div className="destination-img-container">
          <h1>Destination</h1>
          <img
            className="destination-img"
            src={imgplaceholder}
            alt="placeholder"
          />
          <h2>NameOfDestination</h2>
        </div>
        <div className="weather-container">
          <h1>Weather</h1>
          <WeatherBreakdown />
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

export default trip;
