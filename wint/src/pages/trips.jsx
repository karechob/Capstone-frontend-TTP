import React, { useEffect, useState } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTripsThunk } from "../redux/trips/trips.actions";

function Trips() {
 
  
    const trips = useSelector((state) => state.trips.allTrips);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchAllTripsThunk());
    }, [dispatch]);
  
    // Log the updated value of trips whenever it changes
    useEffect(() => {
      console.log("trips: ", trips);
    }, [trips]);
  
  

  // dispatch(fetchTripThunk(4))
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
