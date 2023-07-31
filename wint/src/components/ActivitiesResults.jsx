import { useSelector } from "react-redux/es/hooks/useSelector";
import foodLogo from "../assets/icons/noun-restaurant-3360056.png";
import touristLogo from "../assets/icons/noun-tourist-2769225.png";
import "../css/activity.css";

function ActivitiesResults({
  setActivities,
  activitiesCostSum,
  setActivitiesCostSum,
}) {
  const activitiesArray = useSelector(
    (state) => state.activities.allActivities
  );
  let total = activitiesCostSum;

  function popularityBlock(num) {
    if (num > 0) {
      if (num > 1) {
        return <p className="activity-popularity">{num} people visited here!</p>;
      } else {
        return <p className="activity-popularity">{num} person visited here!</p>;
      }
    } else {
      return;
    }
  }

  function priceLevelBlock(num) {
    if (num === 0) {
      return;
    } else {
      if (num === 1) {
        return <p>$</p>;
      }
      if (num === 2) {
        return <p>$$</p>;
      }
      if (num >= 3) {
        return <p>$$$</p>;
      }
    }
  }

  const handleActivitySelection = (activity, index) => {
    if (index < 5) {
      setActivities((activities) => [
        ...activities,
        {
          name: activity.name,
          cost: activity.price_level * 10 + 5,
          type: activity.type,
          price_level: activity.price_level,
          rating: activity.rating,
          popularity: activity.popularity,
          map_url: activity.map_url,
          place_images: [touristLogo],
        },
      ]);
    } else {
      setActivities((activities) => [
        ...activities,
        {
          name: activity.name,
          cost: activity.price_level * 10 + 5,
          type: activity.type,
          price_level: activity.price_level,
          rating: activity.rating,
          popularity: activity.popularity,
          map_url: activity.map_url,
          place_images: [foodLogo],
        },
      ]);
    }

    total = total + activity.price_level * 10 + 5;
    setActivitiesCostSum(total);
  };

  return (
    <div className="activities-container">
      <h1 className="activity-results-title">Top Places and Activities</h1>
      {activitiesArray ? (
        activitiesArray.map((activity, index) => (
          <div key={index} className="activity-container">
            <div className="activity-item">
              <h2 className="activity-name">{activity.name}</h2>
              {index < 5 ? (
                <img
                  className="activity-img"
                  src={touristLogo}
                  alt="Activity"
                />
              ) : (
                <img className="activity-img" src={foodLogo} alt="Activity" />
              )}
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
              <a href={activity.map_url}>Look on Google Maps!</a>
              <div>
                <input
                  name="activity-selection"
                  type="checkbox"
                  value={activity}
                  onChange={() => handleActivitySelection(activity, index)}
                />
              </div>
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