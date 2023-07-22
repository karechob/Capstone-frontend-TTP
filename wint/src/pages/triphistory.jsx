import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotelsThunk } from "../redux/hotels/hotels.actions"
import "../css/tripHistory.css";
import "../css/trip.css";

function TripHistory() {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.allHotels);
  console.log(hotels)

  useEffect(() => {
    dispatch(fetchAllHotelsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Hotel Trips</h1>
      { hotels ? (
        <div>
        {hotels.map((hotel) => (
          <div key={hotel.hotel_id}>
            <h3>{hotel.hotel_name}</h3>
            <p>Address: {hotel.address}</p>
          </div>
        ))}
      </div>
      ) : (
         <p>Error: couldnt load hotels</p>
      )}
    </div>
    // <div>
    //   hotels
    // </div>
  );
}

export default TripHistory;
