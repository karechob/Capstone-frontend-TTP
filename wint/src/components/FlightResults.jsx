import { useSelector } from "react-redux";
import "../css/flightresults.css";

function FlightResults({flight, setFlight}) {
  const flightInformation = useSelector((state) => state.flights.itineraryData);
  // const tripId = useSelector((state) => state.trips.singleTrip);
  // console.log("this is trip data", tripId);
  const flightData = flightInformation[0];
 

  console.log("this is flight data", flightData);

  const handleSelectFlight = (selectedFlight) => {
    setFlight({
        airline: selectedFlight.airline.name,
        cost: selectedFlight.price,
        link: selectedFlight.airline.website,
      });
  };

  return (
    <div className="flights-container">
      <h1 className="flight-results-title">Flights Available</h1>
      {flightData ? (
        Object.values(flightData).map((itinerary) => (
          <div key={itinerary.itinerary} className="flight-card">
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
              {itinerary.departure.airport.city}, {itinerary.departure.airport.name} ➜{" "}
              {itinerary.arrival.airport.city}, {itinerary.arrival.airport.name}
            </p>
            <input
              name="flightSelection"
              type="radio"
              value={itinerary.itinerary}
              onChange={() => handleSelectFlight(itinerary)}
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