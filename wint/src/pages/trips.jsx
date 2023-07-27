import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTripThunk,
  fetchAllTripsThunk,
} from "../redux/trips/trips.actions";
import { useNavigate } from "react-router-dom";
import "../css/trips.css";

function Trips() {
  const trips = useSelector((state) => state.trips.allTrips);
  const trip = useSelector((state) => state.trips);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllTripsThunk());
  }, [dispatch]);

  console.log("all trips: ", trips);

  function formatDate(dateStr) {
    return new Date(dateStr).toISOString().split("T")[0];
  }

  const handleView = async (key) => {
    const tripId = trip.allTrips[key].id;

    await dispatch(fetchTripThunk(tripId));
    console.log("the trip: ", trip.singleTrip);
    navigateToSingleTrip(tripId);
  };

  const navigateToSingleTrip = (id) => {
    navigate(`../trip/${id}`);
  };

  if (trips.length === 0) {
    return (
      <>
        <h1>Trips</h1>
        <hr />
        <p>No trips history</p>
      </>
    );
  }

  if (trips.length > 0 && !trip.allTrips.length) {
    return (
      <>
        <h1>Trips</h1>
        <hr />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>Trips</h1>
      <hr />

      <table className="table">
        <thead>
          <tr>
            <th className="th"></th>
            <th className="th">Date</th>
            <th className="th">Location</th>
            <th className="th">Hotel</th>
            <th className="th">Cost</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, index) => (
            <tr key={index}>
              <td className="td">
                <button onClick={() => handleView(index)}>View</button>
              </td>
              <td className="td">{formatDate(trip.startDate)}</td>
              <td className="td">{trip.destination}</td>
              <td className="td">{trip.hotel.name}</td>
              <td className="td">${trip.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Trips;
