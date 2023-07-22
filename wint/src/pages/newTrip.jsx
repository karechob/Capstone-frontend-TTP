import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotelsThunk } from "../redux/hotels/hotels.actions"
import "../css/tripHistory.css";
import "../css/trip.css";
import NewTripForm from '../components/NewTripForm'


function NewTrip() {

    const dispatch = useDispatch();
    const allHotels = useSelector((state) => state.hotels.allHotels.results);
    const [showHotels, setShowHotels] = useState(false);

  
    useEffect(() => {
      dispatch(fetchAllHotelsThunk());
    }, [dispatch]);

    const handleShowHotels = () => {
      setShowHotels(true);
    };
  
    return (
      <div>
        <h1>New Trip</h1>
        <NewTripForm/>
        {showHotels ? (
          allHotels && allHotels.length > 0 ? (
            <div>
              {allHotels.map((hotel) => (
                <div className="act-list-item" key={hotel.id}>
                  <h3>{hotel.name}</h3>
                  <p>{hotel.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hotels found.</p>
          )
        ) : (
          <button onClick={handleShowHotels}>Show Hotels</button>
        )}
      </div>
    );
  };

export default NewTrip;

// import React from "react";
// import NewTripForm from "../components/NewTripForm";
// import "../fonts/NeueKonstantGrotesk-Book.otf";

// function newTrip() {
//   return (
//     <div>
//       <NewTripForm />
//     </div>
//   );
// }

// export default newTrip;

