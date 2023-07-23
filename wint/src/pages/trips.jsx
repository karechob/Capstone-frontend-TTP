import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTripsThunk } from "../redux/trips/trips.actions";

function Trips() {
  const trips = useSelector((state) => state.trips.allTrips);
  const dispatch = useDispatch();
  console.log(trips);

  useEffect(() => {
    dispatch(fetchAllTripsThunk());
  }, [dispatch]);

  useEffect(() => {
    console.log("trips: ", trips);
  }, [trips]);

  return (
    // page that displays the trips when clicking on trips on user
    <>
      <h1>Trips</h1>
      <h3>User Name:</h3>
      <button>Settings</button>
      <hr></hr>
      <h3>Previous Trips:</h3>
    </>
  );
}

export default Trips;
