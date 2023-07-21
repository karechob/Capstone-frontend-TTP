import axios from "axios";
import UserActionTypes from "./user.types";

// Fetch user
export const fetchUser = (userData) => ({
  type: UserActionTypes.FETCH_USER,
  payload: userData,
});

export const fetchUserThunk = () => {
  return async (dispatch, getState) => {
    const user = getState().user;
    // console.log("this is user", user)
    try {
      const response = await axios.get(`http://localhost:8080/auth/me/`, {
        withCredentials: true,
      });
      dispatch(fetchUser(response.data || {}));
    } catch (error) {
      console.error(error);
    }
  };
};

// Update user
export const updateUser = (updateData) => ({
  type: UserActionTypes.UPDATE_USER,
  payload: updateData,
});

export const updateUserThunk = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/me`);
      dispatch(updateUser(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

// Signup user
export const signupUser = (userData) => ({
  type: UserActionTypes.SIGNUP_USER,
  payload: userData,
});

export const signupUserThunk = (userData) => {
  return async (dispatch) => {
    try {
      console.log("signupThunk is firing up");
      const response = await axios.post(
        `http://localhost:8080/auth/signup`,
        userData,
        {
          withCredentials: true,
        }
      );
      dispatch(signupUser(response.data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

// Login user
export const loginUser = (userData) => ({
  type: UserActionTypes.LOGIN_USER,
  payload: userData,
});

export const loginUserThunk = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      );
      dispatch(loginUser(response.data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

// Login user with Google
export const googleSignIn = (userData) => ({
  type: UserActionTypes.LOGIN_GOOGLE,
  payload: userData,
});

export const googleSignInThunk = () => {
  return async (dispatch) => {
    try {
      console.log("googleSignInThunk Is Firing Up");
      const response = await axios.get(`http://localhost:8080/auth/google`, {
        withCredentials: true,
      });
      // console.log("this is the response ", response)
      dispatch(googleSignIn(response.data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

// Logout user
export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT_USER,
});

export const logoutUserThunk = () => {
  return async (dispatch) => {
    try {
      console.log("I am in userLogoutThunk");
      await axios.get(`http://localhost:8080/auth/logout`, {
        withCredentials: true,
      });
      dispatch(logoutUser());
    } catch (error) {
      console.error(error);
    }
  };
};
