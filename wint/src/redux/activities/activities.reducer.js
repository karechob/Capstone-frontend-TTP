import ActivitiesActionTypes from "./activities.types";

export const INITIAL_ACTIVITY_STATE = {
  allActivities: [],
  singleActivity: {},
};

const activitiesReducer = (
  state = INITIAL_ACTIVITY_STATE,
  { type, payload }
) => {
  switch (type) {
    case ActivitiesActionTypes.FETCH_ACTIVITIES:
      return { ...state, allActivities: payload };
    case ActivitiesActionTypes.FETCH_SINGLE_ACTIVITY:
      return { ...state, singleActivity: payload };
    case ActivitiesActionTypes.DELETE_ACTIVITY:
      return { ...state, singleActivity: null };
    case ActivitiesActionTypes.ADD_ACTIVITY:
      return { ...state, allActivities: [...state.allActivities, payload] };
    case ActivitiesActionTypes.UPDATE_ACTIVITY:
      return { ...state, singleActivity: payload };
    default:
      return state;
  }
};

export default activitiesReducer;
