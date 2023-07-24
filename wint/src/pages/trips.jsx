import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTripsThunk } from "../redux/trips/trips.actions";
import "../css/trips.css";
import { useNavigate } from "react-router-dom";

function Trips() {
  const trips = useSelector((state) => state.trips.allTrips);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllTripsThunk());
  }, [dispatch]);

  //For formatting date to show only year,month, and day
  function formatDate(dateStr) {
    return new Date(dateStr).toISOString().split("T")[0];
  }

  const handleView = () => {
    navigate("../trip", {
      state: { tripData: trips },
    });
  };

  return (
    <>
      <h1>Trips</h1>
      <hr />

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Location</th>
            <th>Hotel</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {trips.length > 0
            ? trips.map((trip, index) => (
                <tr key={index}>
                  <td>
                    <button onClick={handleView}>View</button>
                  </td>
                  <td>{formatDate(trip.startDate)}</td>
                  <td>{trip.destination}</td>
                  <td>{trip.hotel.name}</td>
                  <td>${trip.budget}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {trips.length === 0 && <p>Loading...</p>}
    </>
  );
}

export default Trips;
