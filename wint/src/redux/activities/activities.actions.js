import axios from "axios";
import ActivitiesActionTypes from "./activities.types";

export const fetchActivities = (payload) => ({
  type: ActivitiesActionTypes.FETCH_ACTIVITIES,
  payload: payload,
});

export const fetchActivitiesThunk = (tripData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://capstone-backend-ttp.vercel.app/api/activities/allactivities`, tripData,
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

//old link https://capstone-backend-5zeo9e8f0-karechob.vercel.app/api/activities/allactivities