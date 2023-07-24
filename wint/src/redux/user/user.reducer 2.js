import UserActionTypes from "./user.types";

const initialState = {
  singleUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { ...state, singleUser: action.payload };
    case UserActionTypes.UPDATE_USER:
    case UserActionTypes.SIGNUP_USER:
    case UserActionTypes.LOGIN_USER:
    case UserActionTypes.LOGIN_GOOGLE:
      return { ...state, singleUser: action.payload };
    case UserActionTypes.LOGOUT_USER:
      return { ...state, singleUser: {} };
    default:
      return state;
  }
};

export default userReducer;