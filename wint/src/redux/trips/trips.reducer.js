import TripsActionTypes from "./trips.types";

export const INITIAL_TRIP_STATE = {
    allTrips: [],
    singleTrip: {},
}

const tripsReducer = (state = INITIAL_TRIP_STATE, { type, payload}) => {
    console.log("TRIPSREDUCER IS HANDLING FETCH ALL TRIPS ACTION")
    switch (type) {
        case TripsActionTypes.FETCH_TRIPS:
            console.log(state);
            return { ...state, allTrips: payload };
        case TripsActionTypes.FETCH_SINGLE_TRIP:
            console.log("Payload of single trip");
            console.log(payload);
            return { ...state, singleTrip: payload };
        case TripsActionTypes.ADD_TRIP:
            console.log("Add Trip successful!");
            return { ...state, singleTrip: [ ...state.allTrips, payload] };
        case TripsActionTypes.UPDATE_TRIP:
            console.log("Update successful!");
            return { ...state, singleTrip: payload };
        case TripsActionTypes.DELETE_TRIP:
            console.log("Delete Trip successful!");
            return { ...state, singleTrip: null };
        default:
            return state;
    }
}

export default tripsReducer;