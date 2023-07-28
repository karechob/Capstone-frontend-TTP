import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTripThunk, updateTripThunk } from "../redux/trips/trips.actions";
import { useNavigate, useParams } from "react-router-dom";
import "../css/userSettings.css";

function EditTrip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { tripId } = useParams();
  //console.log("tripId: ", tripId);
  const trip = useSelector((state) => state.trips.singleTrip);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchTripThunk(tripId));
  }, [tripId]);

    console.log("trip: ", trip);

  return (
    <div className="settings-container">
      <form onSubmit={handleSubmit} className="settings-form">
        <h1 className="settings-heading">SETTINGS</h1>
        <label htmlFor="userName">Name: {trip.name}</label>

        <button type="submit" className="settings-submit-btn">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditTrip;
