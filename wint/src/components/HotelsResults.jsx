import React from "react";
import { useSelector } from "react-redux";
import "../css/hotelsresults.css";
// import Plane from "../assets/icons/Plane.jsx";

function HotelsResults({setHotel}) {
  const hotelInformation = useSelector((state) => state.hotels.hotels);
  const hotelData = hotelInformation[0];

  console.log("this is hotel data", hotelData);

  // Function to round a number to two decimal places
  const roundToTwoDecimalPlaces = (num) => {
    return parseFloat(num).toFixed(2);
  };

  const handleSelectHotel = (selectedHotel) => {
    const roundedPrice = roundToTwoDecimalPlaces(selectedHotel.priceBreakdown.grossPrice.value);
    setHotel({
        name: selectedHotel.name,
        cost: parseFloat(roundedPrice),
        link: selectedHotel.photoMainUrl,
      });
      console.log("this is selected hotel ", roundedPrice)
  };
  return (
    <div className="hotels-container">
      <h1 className="hotels-results-title">Hotels Available</h1>
      {hotelData ? (
        Object.values(hotelData).map((hotel) => (
          <div key={hotel.id} className="hotels-card">
            <h2 className="hotels-name">{hotel.name}</h2>
            <img className="hotel-picture" src={hotel.photoMainUrl} alt={hotel.name} />
            <p className="hotels-price">Price: ${roundToTwoDecimalPlaces(hotel.priceBreakdown.grossPrice.value)}</p>
            <input
             name="hotelSelection"
             type="radio"
             value={hotel}
             onChange={() => handleSelectHotel(hotel)}
            />
          </div>
        ))
      ) : (
        <p>No hotels available.</p>
      )}
    </div>
  );
}

export default HotelsResults;