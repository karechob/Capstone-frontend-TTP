import { combineReducers } from "redux";
import activitiesReducer from "./activities/activities.reducer";
import flightsReducer from "./flights/flights.reducer";
import hotelsReducer from "./hotels/hotels.reducer";
import userReducer from "./user/user.reducer";
import tripsReducer from "./trips/trips.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  activities: activitiesReducer,
  flights: flightsReducer,
  hotels: hotelsReducer,
  trips: tripsReducer,
});

export default rootReducer;
