import ActivitiesActionTypes from "./activities.types";

export const INITIAL_ACTIVITY_STATE = {
  allActivities: [],
};

const activitiesReducer = (
  state = INITIAL_ACTIVITY_STATE,
  { type, payload }
) => {
  switch (type) {
    case ActivitiesActionTypes.FETCH_ACTIVITIES:
      return { ...state, allActivities: payload };
    default:
      return state;
  }
};

export default activitiesReducer;
