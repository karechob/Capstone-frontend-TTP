import React from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import foodLogo from "../assets/icons/noun-restaurant-3360056.png";
import touristLogo from "../assets/icons/noun-tourist-2769225.png";
import "../css/activity.css";

function ActivitiesResults() {
  const activitiesArray = useSelector(
    (state) => state.activities.allActivities
  );

  return (
    <div className="activities-container">
      <h1 className="activity-results-title">Top Places and Activities</h1>
      {activitiesArray ? (
        activitiesArray.map((activity, index) => (
          <div className="activity-item">
            <div className="activity-img-container">
              {index < 5 ? (
                <img
                  className="activity-img"
                  src={touristLogo}
                  alt="Activity"
                />
              ) : (
                <img className="activity-img" src={foodLogo} alt="Activity" />
              )}
            </div>
            <div className="activity-info">
              <h1>{activity.name}</h1>
              <h2>{activity.type}</h2>
              {activity.rating ? (
                <h3>Rating: {activity.rating}</h3>
              ) : (
                <h3>No rating available</h3>
              )}
              <h3>{activity.popularity} people went here!</h3>
              <a href={activity.map_url}>Look on Google Maps!</a>
            </div>
          </div>
        ))
      ) : (
        <p>No Activities available</p>
      )}
    </div>
  );
}

export default ActivitiesResults;
