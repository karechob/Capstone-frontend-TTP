import React, { useEffect } from "react";
import BudgetBreakdownGraph from "../components/trips/BudgetBreakdownGraph";
import "../css/trip.css";
import "../css/flightresults.css";
import "../css/hotelsresults.css";
import Plane from "../assets/icons/Plane";
import { fetchImageThunk, fetchTripThunk } from "../redux/trips/trips.actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserThunk } from "../redux/user/user.actions";
import defaultAvatar from "../assets/avatars/STARBOY.png";

function Trip() {
  let { tripId } = useParams();
  const owner = useSelector((state) => state.user.singleUser);
  const trip = useSelector((state) => state.trips.singleTrip);
  const dispatch = useDispatch();
  const image = useSelector((state) => state.trips.image.data?.mobile);

  function priceLevelBlock(num) {
    if (num === 0) {
      return;
    } else {
      if (num === 1) {
        return <h2>Price Estimate: ~$15</h2>;
      }
      if (num === 2) {
        return <h2>Price Estimate: ~$25</h2>;
      }
      if (num >= 3) {
        return <h2>Price Estimate: +$30</h2>;
      }
    }
  }

  function popularityBlock(num) {
    if (num > 0) {
      if (num > 1) {
        return (
          <p className="activity-popularity">{num} people visited here!</p>
        );
      } else {
        return (
          <p className="activity-popularity">{num} person visited here!</p>
        );
      }
    } else {
      return;
    }
  }

  console.log(trip.activities);

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
            src={owner.image}
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
                  src={defaultAvatar}
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
        <div className="trip-budget-container">
          <h1 className="trip-budget-title">${trip.budget}</h1>
        </div>
      </div>
      <div className="travel-stay-title">
        <h1>Travel & Stay</h1>
      </div>
      <div className="travel-stay-container">
        <div className="flight-container">
          <label className="flights-card">
            <h2 className="airline-name">{trip.flight.airline}</h2>
            <Plane className="flight-img" />
            <h2 className="flight-price">Total Price: ${trip.flight.cost}</h2>
            <p className="airline-link">Airline Website: {trip.flight.link}</p>
          </label>
        </div>
        <div className="hotels-container">
          <label className="hotels-card">
            <h2 className="hotels-name">{trip.hotel.name}</h2>
            <img className="hotels-img" src={trip.hotel.link} alt="Hotel" />
            <h2 className="hotel-price">Total Price: ${trip.hotel.cost}</h2>
          </label>
        </div>
      </div>
      <h1>Activities</h1>
      <div className="activities-list-container">
        {trip.activities?.map((activity, index) => {
          return (
            <div key={index} className="activity-container">
              <div className="activity-item">
                <h2 className="activity-name">{activity.name}</h2>
                <img
                  className="activity-img"
                  src={activity.place_images}
                  alt="Activity"
                />
                <p className="activity-type">{activity.type}</p>
                <div className="activity-price-level">
                  {priceLevelBlock(activity.price_level)}
                </div>
                {activity.rating >= 1 ? (
                  <p className="activity-rating">Rating: {activity.rating}</p>
                ) : (
                  <p>No rating available</p>
                )}
                <div className="activity-popularity">
                  {popularityBlock(activity.popularity)}
                </div>
                <a href={activity.map_url}>Look on Google Maps</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Trip;
