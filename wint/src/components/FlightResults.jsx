import React from "react";
import { useSelector } from "react-redux";
import "../css/flightresults.css";
import Plane from "../assets/icons/Plane.jsx";

function FlightResults() {
  const flightInformation = useSelector((state) => state.flights.itineraryData);
  const flightData = flightInformation[0];

  console.log("this is flight data", flightData);



  //   const handleSubmit {

  //   }

  return (
      <div className="flights-container">
        <h1 className="flight-results-title">Flights Available</h1>
        {flightData ? (
          Object.values(flightData).map((itinerary) => (
            <div key={itinerary.itinerary} className="flight-card">
              <h2 className="airline-name">
                Airline: {itinerary.airline.name}
              </h2>
              <img className="airline-logo" src={itinerary.airline.logo} alt={itinerary.airline.name} />
              <p className="airline-link">
                Airline Website: {itinerary.airline.website}
              </p>
              <p className="ticket-price">Price: ${itinerary.price}</p>
              <p className="departure">
                {itinerary.departure.airport.city},
                {itinerary.departure.airport.name} ➜{" "}
                {itinerary.arrival.airport.city},{" "}
                {itinerary.arrival.airport.name}
              </p>
              <input 
                type="radio"
                // value="flight"
                // checked={this.state.selectedOption === "flight"}
                // onChange={this.onValueChange}
              />
            </div>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </div>
  );
}

export default FlightResults;

// {/* <p>Departure City: {itinerary.departure.airport.city}</p>
// <p>Departure Date: {itinerary.departure.datetime.date_display}</p>
// <p>Departure Time: {itinerary.departure.datetime.time_12h}</p>
// <p>Arrival Airport: {itinerary.arrival.airport.name}</p>
// <p>Arrival City: {itinerary.arrival.airport.city}</p>
// <p>Arrival Date: {itinerary.arrival.datetime.date_display}</p>
// <p>Arrival Time: {itinerary.arrival.datetime.time_12h}</p> */}

//   <Plane width="150px" height="150px" /> 
