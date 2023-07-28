import axios from "axios";
import ActivitiesActionTypes from "./activities.types";

export const fetchActivities = (payload) => ({
  type: ActivitiesActionTypes.FETCH_ACTIVITIES,
  payload: payload,
});

export const fetchActivitiesThunk = (destination) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/activities/allactivities`,
        { destination: destination },
        {
          withCredentials: true,
        }
      );
      
      console.log("This is response data:", response.data);
      dispatch(fetchActivities(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
