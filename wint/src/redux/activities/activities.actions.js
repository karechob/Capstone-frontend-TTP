import axios from "axios";
import ActivitiesActionTypes from "./activities.types";


// Fetch all activities
export const fetchAllActivities = (activityData) => ({
    type: ActivitiesActionTypes.FETCH_ACTIVITIES,
    payload: activityData,
});

export const fetchAllActivitiesThunk = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/activities`);
            dispatch(fetchAllActivities(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}


// Fetch single activity by id
export const fetchActivity = (activityData) => ({
    type: ActivitiesActionTypes.FETCH_SINGLE_ACTIVITY,
    payload: activityData,
});

export const fetchActivityThunk = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/activities/${id}`);
            dispatch(fetchActivity(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}


// Add an activity
export const addActivity = (activityData) => ({
    type: ActivitiesActionTypes.ADD_ACTIVITY,
    payload: activityData,
});

export const addActivityThunk = (activityData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/activities/`, activityData);
            dispatch(addActivity(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}


// Updating an activity
export const updateActivity = (updateData) => ({
    type: ActivitiesActionTypes.UPDATE_ACTIVITY,
    payload: updateData,
});

export const updateActivityThunk = (updateActivity) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/activities/${updateActivity.id}`, updateActivity);
            dispatch(updateActivity(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}


// Delete an activity
export const deleteActivity = (deleteData) => ({
    type: ActivitiesActionTypes.UPDATE_ACTIVITY,
    payload: deleteData,
});

export const deleteActivityThunk = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/activities/${id}`);
            dispatch(deleteActivity(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}
