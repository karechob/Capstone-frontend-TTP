// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// //import { fetchAllHotelsThunk } from "../redux/hotels/hotels.actions";

// function Test() {
//   const dispatch = useDispatch();

//   const allHotels = useSelector((state) => state.hotels.allHotels.results);
//   const handleTestClick = () => {
//     //dispatch(fetchAllHotelsThunk());
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <h1>Test Component</h1>
//       <button onClick={handleTestClick}>Test Fetch All Hotels Thunk</button>

//       {Array.isArray(allHotels) && allHotels.length > 0 ? (
//         <div>
//           <h2>Hotels Data:</h2>
//           <ul>
//             {allHotels.map((hotel) => (
//               <li key={hotel.id}>
//                 <p>Name: {hotel.name}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No hotels data available.</p>
//       )}
//     </div>
//   );
// }

// export default Test;
