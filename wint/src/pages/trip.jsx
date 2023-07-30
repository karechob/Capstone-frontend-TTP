import React, { useEffect } from "react";
import BudgetBreakdownGraph from "../components/trips/BudgetBreakdownGraph";
import "../css/trip.css";
import defaultpic1 from "../assets/avatars/dogGlasses.png";
import defaultpic2 from "../assets/avatars/appleDog.png";
import PlaceholderActivity from "../assets/images/little-island.jpg";

import { fetchImageThunk, fetchTripThunk } from "../redux/trips/trips.actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserThunk } from "../redux/user/user.actions";

function Trip() {
  let { tripId } = useParams();
  const owner = useSelector((state) => state.user.singleUser);
  const trip = useSelector((state) => state.trips.singleTrip);
  const dispatch = useDispatch();
  const image = useSelector((state) => state.trips.image.data?.mobile);

  useEffect(() => {
    dispatch(fetchUserThunk(trip.ownerId));

    dispatch(fetchTripThunk(tripId));
    dispatch(fetchImageThunk(trip.destination));
  }, [dispatch, tripId, trip.destination, trip.ownerId]);
  return (
    <div className="background-trip-page">
      <h1>{trip.name}</h1>
      <h2>Owner & Collaborators</h2>
      <div className="collaborators-container">
        <h3>Owner</h3>
        <div className="owner-image">
          <img
            className="owner-indiv-img"
            src={defaultpic1}
            alt="default-pic"
          />
        </div>
        <h2>{owner?.name}</h2>
        {!!trip.collaborators ? (
          trip.collaborators.map((collaborator) => {
            return (
              <div className="collaborator-image">
                <img
                  className="collaborator-indiv-img"
                  src={defaultpic2}
                  alt="default-pic"
                />
                <h2>{collaborator.name}</h2>
              </div>
            );
          })
        ) : (
          <p>No Collaborators...</p>
        )}
      </div>
      <div className="weather-destination-container">
        <div className="destination-img-container">
          <h1>Destination</h1>
          <img className="destination-img" src={image} alt="placeholder" />
          <h2>{trip.destination}</h2>
        </div>
      </div>
      <h1>Budget Breakdown</h1>
      <div className="budget-graph-container">
        <BudgetBreakdownGraph className="graph-budget" />
      </div>
      <h1>Activities</h1>
      <div className="activities-list-container">
        {trip.activities?.map((activity) => {
          return (
            <div className="act-list-item">
              <div className="activity-img-container">
                <img
                  className="activity-img"
                  src={PlaceholderActivity}
                  alt="Activity"
                />
              </div>
              <div className="activity-info">
                <h1>ActivityName: {activity.name}</h1>
                <h2>Budget: ${activity.cost}</h2>
                <h2>Link to place googlemaps</h2>
              </div>
            </div>
          );
        })}
      </div>
      <h1>Travel & Stay</h1>
      <h1>Things to Note</h1>
    </div>
  );
}

export default Trip;
