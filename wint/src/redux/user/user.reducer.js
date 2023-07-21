import UserActionTypes from "./user.types";

const INITIAL_USER_STATE = {
  singleUser: {},
  isLoggedIn: false,
  isSignedUp: false,
};

const userReducer = (state = INITIAL_USER_STATE, { type, payload }) => {
  // console.log("USERREDUCER IS HANDLING FETCH ALL USER ACTIONS");
  switch (type) {
    case UserActionTypes.FETCH_USER:
      // console.log("Payload of single user");
      // console.log(payload);
      return { ...state, singleUser: payload };
    case UserActionTypes.UPDATE_USER:
      // console.log("Update successful!");
      return { ...state, singleUser: payload };
    case UserActionTypes.SIGNUP_USER:
      // console.log("Signup successful!");
      return {
        ...state,
        singleUser: payload,
        isSignedUp: true,
        isLoggedIn: true,
      };
    case UserActionTypes.LOGIN_USER:
      // console.log("Login successful!");
      return { ...state, singleUser: payload, isLoggedIn: true };
    case UserActionTypes.LOGOUT_USER:
      // console.log("Logout successful!");
      return { ...state, singleUser: {}, isLoggedIn: false };
    case UserActionTypes.LOGIN_GOOGLE:
      // console.log("Google login successful!");
      return { ...state, singleUser: payload, isLoggedIn: true };
    default:
      return state;
  }
};

export default userReducer;
