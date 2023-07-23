import React, { useEffect, useState } from "react";
import "../fonts/NeueKonstantGrotesk-Book.otf";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotelsThunk } from "../redux/hotels/hotels.actions";
import { fetchAllFlightsThunk } from "../redux/flights/flights.actions";
import NewTripForm from "../components/NewTripForm";
import "../css/tripHistory.css";
import "../css/trip.css";

function NewTrip() {
//   const dispatch = useDispatch();
//   const allHotels = useSelector((state) => state.hotels.allHotels.results);
//   console.log("this is allHotels", allHotels);
//   const allFlights = useSelector((state) => state.flights.allFlights);
//   console.log("this is allFlights", allFlights);
//   const [showHotels, setShowHotels] = useState(false);
  //   const [showFlights, setShowFlights] = useState(false);

//   useEffect(() => {
//     dispatch(fetchAllFlightsThunk());
//   }, [dispatch]);

//   const { airline_data, airport_data } =
//     allFlights.getAirFlightRoundTrip.results.result;

//   useEffect(() => {
//     dispatch(fetchAllHotelsThunk());
//   }, [dispatch]);

//   const handleShowHotels = () => {
//     setShowHotels(true);
//   };

  //   const handleShowFlights = () => {
  //     if (!allFlights || allFlights.length === 0) {
  //       // Fetch flights only if not already loaded
  //       dispatch(fetchAllFlightsThunk());
  //     }
  //     setShowFlights(true);
  //   };

  return (
    <div>
      <h1>New Trip</h1>
      <NewTripForm />
      {/* {showHotels ? (
        allHotels && allHotels.length > 0 ? (
          <div>
            {allHotels.map((hotel) => (
              <div className="act-list-item" key={hotel.id}>
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hotels found.</p>
        )
      ) : (
        <button onClick={handleShowHotels}>Show Hotels</button>
      )} */}
{/* 
      <div>
        <h1>Flight Data</h1>
        
        <div>
          <h2>Airline Data</h2>
          {Object.keys(airline_data).map((key) => (
            <div key={key}>
              <h3>Airline {key}</h3>
              <pre>{JSON.stringify(airline_data[key], null, 2)}</pre>
            </div>
          ))}
        </div> */}

   
        {/* <div>
          <h2>Airport Data</h2>
          {Object.keys(airport_data).map((key) => (
            <div key={key}>
              <h3>Airport {key}</h3>
              <pre>{JSON.stringify(airport_data[key], null, 2)}</pre>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default NewTrip;
