import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTripsThunk } from "../redux/trips/trips.actions";

function Trips() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchAllTripsThunk());
  }, [dispatch]);

  const trips = useSelector((state) => state.trips.allTrips);

  return (
    <>
      <h1>Trips</h1>
      <hr></hr>
      <h3>Trips:</h3>
      {trips.length > 0 ? trips.map((trip, index) => (
        <div key={index}>
          <p>{trip.name}</p>
          <p>{trip.origin}</p>
        </div>
      )) : <p>Loading...</p>}
    </>
  );
}


export default Trips;
