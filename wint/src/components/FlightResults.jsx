import { useSelector } from "react-redux";
import "../css/flightresults.css";

function FlightResults({ setFlight, setOriginalFlightCost }) {
  const flightInformation = useSelector((state) => state.flights.itineraryData);
  let flightData = {};
  for (const flightObj of flightInformation) {
    if (Object.keys(flightObj).length > 0) {
      flightData = flightObj;
      break;
    }
  }

  const handleSelectFlight = (selectedFlight) => {
    setFlight({
      airline: selectedFlight.airline.name,
      cost: parseFloat(selectedFlight.price),
      link: selectedFlight.airline.website,
    });
    setOriginalFlightCost(parseFloat(selectedFlight.price));
  };

  return (
    <div className="flights-container">
      <h1 className="flight-results-title">Flights Available</h1>
      {flightData ? (
        Object.values(flightData).map((itinerary, index) => (
          <div key={index} className="flight-container">
          <label key={itinerary.itinerary} className="flight-card">
            <h2 className="airline-name">{itinerary.airline.name}</h2>
            <img
              className="airline-logo"
              src={itinerary.airline.logo}
              alt={itinerary.airline.name}
            />
            <p className="airline-link">
              Airline Website: {itinerary.airline.website}
            </p>
            <p className="ticket-price">Price: ${itinerary.price}</p>
            <p className="departure">
              {itinerary.departure.airport.city},{" "}
              {itinerary.departure.airport.name} ➜{" "}
              {itinerary.arrival.airport.city}, {itinerary.arrival.airport.name}
            </p>
            <input
              name="flightSelection"
              type="radio"
              value={itinerary.itinerary}
              onChange={() => handleSelectFlight(itinerary)}
            />
          </label>
          </div>
        ))
      ) : (
        <p>No flights available.</p>
      )}
    </div>
  );
}

export default FlightResults;
