import axios from "axios";
import UserActionTypes from "./user.types";

export const fetchUser = (userData) => ({
  type: UserActionTypes.FETCH_USER,
  payload: userData,
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

export const setLoginStatus = (isLoggedIn) => ({
  type: UserActionTypes.SET_LOGIN_STATUS,
  payload: isLoggedIn,
});

export const fetchUserThunk = () => async (dispatch) => {
  try {
    console.log("FETCHUSERTHUNK FIRING UP");
    const response = await axios.get(`http://localhost:8080/auth/me/`, {
      withCredentials: true,
    });
    dispatch(fetchUser(response.data || {}));
  } catch (error) {
    console.error(error);
  }
};

export const updateUserThunk = (userData) => async (dispatch) => {
  try {
    console.log("UPDATEUSERTHUNK FIRING UP");
    const response = await axios.put(`http://localhost:8080/api/me`, userData);
    dispatch(updateUser(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const signupUserThunk = (userData) => async (dispatch) => {
  try {
    console.log("SIGNUPUSERTHUNK FIRING UP");

    const response = await axios.post(
      `http://localhost:8080/auth/signup`,
      userData,
      { withCredentials: true }
    );
    dispatch(signupUser(response.data));
    sessionStorage.setItem("isLoggedIn", "true");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUserThunk = (userData) => async (dispatch) => {
  try {
    console.log("LOGINUSERTHUNK FIRING UP");

    const response = await axios.post(
      `http://localhost:8080/auth/login`,
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

    await axios.get(`http://localhost:8080/auth/logout`, {
      withCredentials: true,
    });
    dispatch(logoutUser());
    sessionStorage.removeItem("isLoggedIn");
  } catch (error) {
    console.error(error);
  }
};
