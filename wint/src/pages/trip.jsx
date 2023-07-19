import React from "react";
import BudgetBreakdownGraph from "../components/trips/BudgetBreakdownGraph";
import Collaborators from "../components/trips/Collaborators";
import WeatherBreakdown from "../components/trips/WeatherBreakdown";
import "../css/trip.css";
import imgplaceholder from "../pictures/nyc.jpg";

function trip() {
  return (
    <div>
      <h1>Owner & Collaborators</h1>
      <Collaborators />
      <h1>Budget Breakdown</h1>
      <div className="budget-graph-container">
        <BudgetBreakdownGraph className="graph-budget" />
      </div>
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
    </div>
  );
}

export default trip;
