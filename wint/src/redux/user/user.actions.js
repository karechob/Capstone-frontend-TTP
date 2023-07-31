import axios from "axios";
import UserActionTypes from "./user.types";

export const fetchUser = (userData) => ({
  type: UserActionTypes.FETCH_USER,
  payload: userData,
});

export const fetchCollaborator = (collaboratorData) => ({
  type: UserActionTypes.FETCH_COLLABORATOR,
  payload: collaboratorData,
});

export const updateUser = (updateData) => ({
  type: UserActionTypes.UPDATE_USER,
  payload: updateData,
});

export const signupUser = (userData) => ({
  type: UserActionTypes.SIGNUP_USER,
  payload: userData,
});

export const loginUser = (userData) => ({
  type: UserActionTypes.LOGIN_USER,
  payload: userData,
});

export const loginGoogle = (userData) => ({
  type: UserActionTypes.LOGIN_GOOGLE,
  payload: userData,
});

export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT_USER,
});

export const deleteUser = () => ({
  type: UserActionTypes.DELETE_USER,
});

export const setLoginStatus = (isLoggedIn) => ({
  type: UserActionTypes.SET_LOGIN_STATUS,
  payload: isLoggedIn,
});

export const addCollaborator = (collaborator) => ({
  type: "ADD_COLLABORATOR",
  payload: collaborator,
});

export const removeCollaborator = (collaboratorId) => ({
  type: UserActionTypes.REMOVE_COLLABORATOR,
  payload: collaboratorId,
});

export const clearCollaborators = () => ({
  type: UserActionTypes.CLEAR_COLLABORATORS,
});

export const fetchUserThunk = () => async (dispatch) => {
  try {
    console.log("FETCHUSERTHUNK FIRING UP");
    const response = await axios.get(`https://capstone-backend-ttp.vercel.app/auth/me`, {
      withCredentials: true,
    });
    dispatch(fetchUser(response.data || {}));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCollaboratorThunk =
  (collaboratorData) => async (dispatch) => {
    try {
      console.log("FETCHUSERTHUNK FIRING UP");
      const response = await axios.post(
        `https://capstone-backend-ttp.vercel.app/api/me/collaborator`,
        collaboratorData,
        {
          withCredentials: true,
        }
      );
      dispatch(fetchCollaborator(response.data));
    } catch (error) {
      console.error(error);
    }
  };

export const removeCollaboratorThunk =
  (collaboratorId, tripId) => async (dispatch) => {
    try {
      console.log("REMOVECOLLABORATORTHUNK FIRING UP");
      console.log(collaboratorId, tripId);
      await axios.delete(
        `https://capstone-backend-ttp.vercel.app/api/me/trips/${tripId}/collaborators/${collaboratorId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(removeCollaborator(collaboratorId));
    } catch (error) {
      console.error(error);
    }
  };

export const updateUserThunk = (userData) => async (dispatch) => {
  try {
    console.log("UPDATEUSERTHUNK FIRING UP");
    const response = await axios.put(`https://capstone-backend-ttp.vercel.app/api/me`, userData, {
      withCredentials: true,
    });

    dispatch(updateUser(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const signupUserThunk = (userData) => async (dispatch) => {
  try {
    console.log("SIGNUPUSERTHUNK FIRING UP");

    const response = await axios.post(
      `https://capstone-backend-ttp.vercel.app/auth/signup`,
      userData,
      { withCredentials: true }
    );
    dispatch(signupUser(response.data));
    sessionStorage.setItem("isLoggedIn", "true");
  } catch (error) {
    sessionStorage.setItem("isLoggedIn", "false");
    console.error(error);
    throw error;
  }
};

export const loginUserThunk = (userData) => async (dispatch) => {
  try {
    console.log("LOGINUSERTHUNK FIRING UP");

    const response = await axios.post(
      `https://capstone-backend-ttp.vercel.app/auth/login`,
      userData,
      { withCredentials: true }
    );
    dispatch(loginUser(response.data));
    sessionStorage.setItem("isLoggedIn", "true");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUserThunk = () => async (dispatch) => {
  try {
    console.log("LOGOUTUSERTHUNK FIRING UP");

    await axios.get(`https://capstone-backend-ttp.vercel.app/auth/logout`, {
      withCredentials: true,
    });
    dispatch(logoutUser());
    sessionStorage.removeItem("isLoggedIn");
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserThunk = () => async (dispatch) => {
  try {
    await axios.delete(`https://capstone-backend-ttp.vercel.app/api/me/`, {
      withCredentials: true,
    });
    dispatch(deleteUser());
    sessionStorage.removeItem("isLoggedIn");
  } catch (error) {
    console.error(error);
  }
};