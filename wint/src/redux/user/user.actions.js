import axios from "axios";
import UserActionTypes from "./user.types";

// Fetch user
export const fetchUser = (userData) => ({
  type: UserActionTypes.FETCH_USER,
  payload: userData,
});

export const fetchUserThunk = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/me/`, {
        withCredentials: true,
      });
      dispatch(fetchUser(response.data));
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
      console.log(response.data);
      dispatch(signupUser(response.data));
    } catch (error) {
      console.error(error);
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
    }
  };
};

// Google login thunk is not finished

// // Login user with Google
// export const loginGoogle = (userData) => ({
//   type: UserActionTypes.LOGIN_GOOGLE,
//   payload: userData,
// });

// export const loginGoogleThunk = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(`http://localhost:8080/auth/google`);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// Logout user
export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT_USER,
});

export const logoutUserThunk = () => {
  return async (dispatch) => {
    try {
      console.log("I am in userLogoutThunk");
      const response = await axios.get(`http://localhost:8080/auth/logout`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(logoutUser());
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
};
