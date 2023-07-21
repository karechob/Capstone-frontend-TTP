import UserActionTypes from "./user.types";

const INITIAL_USER_STATE = {
  singleUser: {},
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
      };
    case UserActionTypes.LOGIN_USER:
      // console.log("Login successful!");
      return { ...state, singleUser: payload };
    case UserActionTypes.LOGOUT_USER:
      // console.log("Logout successful!");
      return { ...state, singleUser: {} };
    case UserActionTypes.LOGIN_GOOGLE:
      // console.log("Google login successful!");
      return { ...state, singleUser: payload };
    default:
      return state;
  }
};

export default userReducer;
