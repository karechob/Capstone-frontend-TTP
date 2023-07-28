import UserActionTypes from "./user.types";

const initialState = {
  singleUser: {},
  collaborator: {},
  collaborators: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { ...state, singleUser: action.payload };
    case UserActionTypes.FETCH_COLLABORATOR:
      return { ...state, collaborator: action.payload };
    case UserActionTypes.UPDATE_USER:
    case UserActionTypes.SIGNUP_USER:
    case UserActionTypes.LOGIN_USER:
    case UserActionTypes.LOGIN_GOOGLE:
      return { ...state, singleUser: action.payload };
    case UserActionTypes.LOGOUT_USER:
      return { ...state, singleUser: {} };
    case UserActionTypes.DELETE_USER:
      return { ...state, singleUser: {} };
    case UserActionTypes.ADD_COLLABORATOR:
      return {
        ...state,
        collaborators: [...state.collaborators, action.payload],
      };
    case UserActionTypes.REMOVE_COLLABORATOR:
      return {
        ...state,
        collaborators: state.collaborators.filter(
          (collaborator) => collaborator.id !== action.payload
        ),
      };
    case UserActionTypes.CLEAR_COLLABORATORS:
      return {
        ...state,
        collaborators: [],
      };
    default:
      return state;
  }
};

export default userReducer;
