import axios from "axios";
import UserActionTypes from "./user.types";

// Fetch single user
export const fetchUser = (userData) => ({
    type: UserActionTypes.FETCH_SINGLE_USER,
    payload: userData,
});

export const fetchUserThunk = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${id}`);
            dispatch(fetchUser(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}


// Update user
export const updateUser = (updateData) => ({
    type: UserActionTypes.UPDATE_USER,
    payload: updateData,
});

export const updateUserThunk = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${id}`);
            dispatch(updateUser(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}