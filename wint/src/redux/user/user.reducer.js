import UserActionTypes from "./user.types";

export const INITIAL_USER_STATE = {
    singleUser: {},
}

const userReducer = (state = INITIAL_USER_STATE, { type, payload}) => {
    console.log("USERREDUCER IS HANDLING FETCH ALL USER ACTIONS")
    switch (type) {
        case UserActionTypes.FETCH_SINGLE_USER:
            console.log("Payload of single user");
            console.log(payload);
            return { ...state, singleUser: payload };
        // case UserActionTypes.ADD_USER:
        //     console.log("Add user successful!");
        //     return { ...state, singleUser: [ ...state.allUsers, payload] };
        case UserActionTypes.UPDATE_USER:
            console.log("Update successful!");
            return { ...state, singleUser: payload };
        // case UserActionTypes.DELETE_USER:
        //     console.log("Delete User successful!");
        //     return { ...state, singleUser: null };
        default:
            return state;
    }
}

export default userReducer;