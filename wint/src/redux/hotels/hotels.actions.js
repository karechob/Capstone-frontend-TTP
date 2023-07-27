import axios from "axios";
import HotelsActionTypes from "./hotels.types";

export const fetchDestination = (payload) => {
  return {
    type: HotelsActionTypes.FETCH_DESTINATION,
    payload: payload,
  };
};

export const fetchInformation = (payload) => {
  return {
    type: HotelsActionTypes.FETCH_INFORMATION,
    payload: payload,
  };
};


export const fetchDestinationThunk = (name) => async (dispatch) =>{
    try {
      const response = await axios.post(`http://localhost:8080/api/hotels/destination`, {name: name}, {withCredentials : true},);
      console.log("this is destination for hotels", response.data)
      dispatch(fetchDestination(response.data));
    } catch (error) {
      console.log(error)
    }
  };

// const pricerangeformat = `price::USD${lower}-${higher}`;  
export const fetchInformationThunk = (checkout_date, dest_id, checkin_date, categories_filter_ids) => async (dispatch) => {
  try {
    console.log("FETCH AIRPORT THUNK IS FIRING UP");
    console.log("this is checkout date", checkout_date); //(2023-08-29)
    console.log("this is dest_id", dest_id);
    console.log("this is checkin_date", checkin_date);
    console.log("this is categories_filter_ids", categories_filter_ids);
    const response = await axios.post(`http://localhost:8080/api/hotels/information`, 
    {checkout_date: checkout_date},
    {dest_id: dest_id},
    {checkin_date: checkin_date},
    {categories_filter_ids: categories_filter_ids},
    {withCredentials : true},);
    console.log("this is response data", response.data)
    dispatch(fetchInformation(response.data));
  } catch (error) {
    console.log(error);
  }
};