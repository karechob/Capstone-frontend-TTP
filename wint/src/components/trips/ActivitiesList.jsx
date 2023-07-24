import React from "react";
import PlaceholderActivity from "../../assets/images/little-island.jpg";

function ActivitiesList() {
  return (
    <div className="activities-list-container">
      <div className="act-list-item">
        <div className="activity-img-container">
          <img
            className="activity-img"
            src={PlaceholderActivity}
            alt="Activity"
          />
        </div>
        <div className="activity-info">
          <h1>ActivityName</h1>
          <h2>Budget: $$$</h2>
          <h2>Link to place googlemaps</h2>
        </div>
      </div>
      <div className="act-list-item">
        <div className="activity-img-container">
          <img
            className="activity-img"
            src={PlaceholderActivity}
            alt="Activity"
          />
        </div>
        <div className="activity-info">
          <h1>ActivityName</h1>
          <h2>Budget: $$$</h2>
          <h2>Link to place googlemaps</h2>
        </div>
      </div>
      <div className="act-list-item">
        <div className="activity-img-container">
          <img
            className="activity-img"
            src={PlaceholderActivity}
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
  );
}

export default ActivitiesList;
