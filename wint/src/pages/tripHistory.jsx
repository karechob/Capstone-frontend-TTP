import React from "react";
import "../css/tripHistory.css";
import "../css/trip.css";

function TripHistory() {
  // page for trip history of a single trip
  return (
    <div className="background-trip-page">
      <h1>Trip History</h1>
      <h3 className="header-trips">Trips</h3>
      <hr></hr>
      <div>
        <div className="activities-list-container">
          {/* Start of activity item */}
          <div className="act-list-item">
            <div className="activity-img-container">
              <img
                className="activity-img"
                // src={PlaceholderActivity}
                alt="Activity"
              />
            </div>
            <div className="activity-info">
              <h1>ActivityName</h1>
              <h2>Budget: $$$</h2>
              <h2>Link to place googlemaps</h2>
              <button className="">View</button>
            </div>
          </div>
          {/* second list item */}
          <div className="act-list-item">
            <div className="activity-img-container">
              <img
                className="activity-img"
                // src={PlaceholderActivity}
                alt="Activity"
              />
            </div>
            <div className="activity-info">
              <h1>ActivityName</h1>
              <h2>Budget: $$$</h2>
              <h2>Link to place googlemaps</h2>
            </div>
          </div>
          {/* third list item */}
          <div className="act-list-item">
            <div className="activity-img-container">
              <img
                className="activity-img"
                // src={PlaceholderActivity}
                alt="Activity"
              />
            </div>
            <div className="activity-info">
              <h1>ActivityName</h1>
              <h2>Budget: $$$</h2>
              <h2>Link to place googlemaps</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripHistory;
