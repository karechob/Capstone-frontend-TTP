import React from "react";
import { useSelector } from "react-redux";
import "../css/flightresults.css";

function FlightResults() {
  const flightInformation = useSelector((state) => state.flights.itineraryData);
  console.log("this is flight data", flightInformation)

  return (
    <div>
      <h1 className="flight-results-title">Flights Available</h1>
    </div>
  );
}

export default FlightResults;

// {/* <div className="campus-grid">
// <div className="container-campus" key={item.id}>
//   <div className="campus-pic">
//     <img src={item.imageUrl} alt={item.name} />
//   </div>
//   {/* <h1>{item.name}</h1> */}
//   <div className="div-card-name">

//     <h1 className="item-name">{item.name}</h1>

//   </div>
//   <button onClick={() => props.handleRemoveCampus(item.id)}>X</button>
// </div>
// </div> */}

  /*
  
  {
      hotels {
         objct
      },
      flights {
          objtc
      },
      activities [
          {
          objcst
        }
    ]
  }
  
  */
