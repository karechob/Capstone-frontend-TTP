// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addTripThunk } from "../redux/trips/trips.actions";
// import {
//   fetchCollaboratorThunk,
//   fetchUserThunk,
// } from "../redux/user/user.actions";
// import CitySearch from "./CitySearch";
// import { formatDate2 } from "./formatDate";

// function NewTripForm() {
//   const dispatch = useDispatch();
//   const collaborator = useSelector(
//     (state) => state.user.collaborator.collaborator
//   );

//   const [name, setName] = useState("");
//   const [origin, setOrigin] = useState("");
//   const [budget, setBudget] = useState("");
//   const [destination, setDestination] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   // const [weather, setWeather] = useState("");
//   const [duration, setDuration] = useState(0);
//   // const [hotelName, setHotelName] = useState("");
//   // const [hotelCost, setHotelCost] = useState("");
//   // const [hotelUrl, setHotelUrl] = useState("");
//   // const [flightAirline, setFlightAirline] = useState("");
//   // const [flightCost, setFlightCost] = useState("");
//   // const [flightUrl, setFlightUrl] = useState("");
//   // const [activities, setActivities] = useState([]);
//   const [collaboratorsInput, setCollaboratorsInput] = useState("");
//   const [collaborators, setCollaborators] = useState([]);
//   const [collaboratorError, setCollaboratorError] = useState("");
//   // const [activityError, setActivityError] = useState("");
//   const [collaboratorsDeleteStatus, setCollaboratorsDeleteStatus] =
//     useState(false);
//   const [cityCoordinates, setCityCoordinates] = useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   useEffect(() => {
//     if (
//       collaborator &&
//       !collaboratorsDeleteStatus &&
//       !collaborators.find((c) => c.username === collaborator.username)
//     ) {
//       setCollaborators((prevCollaborators) => [
//         ...prevCollaborators,
//         collaborator,
//       ]);
//       setCollaboratorsInput("");
//     }
//   }, [collaborator, collaborators, collaboratorsDeleteStatus]);

//   useEffect(() => {
//     dispatch(fetchUserThunk());
//   }, [dispatch]);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleBudgetChange = (e) => {
//     setBudget(e.target.value);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//     updateDuration(e.target.value, endDate);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//     updateDuration(startDate, e.target.value);
//   };

//   // const handleWeatherChange = (e) => {
//   //   setWeather(e.target.value);
//   // };

//   const updateDuration = (start, end) => {
//     if (start && end) {
//       const startDate = new Date(start);
//       const endDate = new Date(end);
//       const durationMilliseconds = endDate.getTime() - startDate.getTime();
//       const durationDays = Math.floor(
//         durationMilliseconds / (1000 * 60 * 60 * 24)
//       );
//       setDuration(durationDays);
//     } else {
//       setDuration(0);
//     }
//   };

//   // const handleHotelNameChange = (e) => {
//   //   setHotelName(e.target.value);
//   // };

//   // const handleHotelCostChange = (e) => {
//   //   setHotelCost(e.target.value);
//   // };

//   // const handleHotelUrlChange = (e) => {
//   //   setHotelUrl(e.target.value);
//   // };

//   // const handleFlightAirlineChange = (e) => {
//   //   setFlightAirline(e.target.value);
//   // };

//   // const handleFlightCostChange = (e) => {
//   //   setFlightCost(e.target.value);
//   // };

//   // const handleFlightUrlChange = (e) => {
//   //   setFlightUrl(e.target.value);
//   // };

//   // const handleActivityNameChange = (index, e) => {
//   //   const newActivities = [...activities];
//   //   newActivities[index].name = e.target.value;
//   //   setActivities(newActivities);
//   // };

//   // const handleActivityCostChange = (index, e) => {
//   //   const newActivities = [...activities];
//   //   newActivities[index].cost = parseFloat(e.target.value);
//   //   setActivities(newActivities);
//   // };

//   // const addActivity = () => {
//   //   setActivities([...activities, { name: "", cost: 0 }]);
//   // };

//   // const removeActivity = (index) => {
//   //   const newActivities = [...activities];
//   //   newActivities.splice(index, 1);
//   //   setActivities(newActivities);
//   // };

//   const handleCollaboratorsInputChange = (e) => {
//     setCollaboratorsInput(e.target.value);
//     setCollaboratorError("");
//   };

//   const handleAddCollaborator = async () => {
//     try {
//       if (!collaboratorsInput.trim()) {
//         setCollaboratorError("Collaborator input is empty");
//         return;
//       }
//       setCollaboratorError("");

//       const collaboratorData = {};
//       if (collaboratorsInput.includes("@")) {
//         collaboratorData.email = collaboratorsInput;
//       } else {
//         collaboratorData.username = collaboratorsInput;
//       }

//       if (collaborators.find((c) => c.username === collaboratorData.username)) {
//         setCollaboratorError("Collaborator already exists");
//         return;
//       }

//       dispatch(fetchCollaboratorThunk(collaboratorData)).catch((error) => {
//         console.error("Error fetching collaborator:", error);
//         setCollaboratorError("Collaborator not found");
//       });
//       setCollaboratorsDeleteStatus(false);
//       setCollaboratorsInput("");
//     } catch (error) {
//       console.error("Error handling collaborator:", error);
//     }
//   };

//   const handleRemoveCollaborator = (collaboratorId) => {
//     const updatedCollaborators = collaborators.filter(
//       (collaborator) => collaborator.id !== collaboratorId
//     );
//     setCollaborators(updatedCollaborators);
//     setCollaboratorsDeleteStatus(true);
//   };

//   const handleFromCitySelect = (selectedCity) => {
//     setOrigin(selectedCity.name);
//     setCityCoordinates({
//       latitude: selectedCity.latitude,
//       longitude: selectedCity.longitude,
//     });
//     // console.log(cityCoordinates);
//     // dispatch(fetchAirportsThunk(selectedCity.name));
//   };

//   const handleToCitySelect = (selectedCity) => {
//     setDestination(selectedCity.name);
//     setCityCoordinates({
//       latitude: selectedCity.latitude,
//       longitude: selectedCity.longitude,
//     });
//     console.log(cityCoordinates);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // if (activities.length === 0) {
//     //   setActivityError("At least one activity is required.");
//     //   return;
//     // }

//     const newTripData = {
//       name,
//       origin,
//       destination,
//       budget,
//       startDate: formatDate2(startDate),
//       endDate: formatDate2(endDate),
//       // weather,
//       // duration,
//       // hotel: {
//       //   name: hotelName,
//       //   cost: parseFloat(hotelCost),
//       //   link: hotelUrl,
//       // },
//       // flight: {
//       //   airline: flightAirline,
//       //   cost: parseFloat(flightCost),
//       //   link: flightUrl,
//       // },
//       // activities: activities.filter(
//       //   (activity) => activity.name.trim() !== "" && activity.cost > 0
//       // ),
//       collaborators: collaborators,
//     };
//     // setActivityError("");

//     // dispatch(addTripThunk(newTripData));
//     //console.log(newTripData);

//     // console.log("This is the destination being passed", newTripData.destination);
//     // dispatch(fetchActivitiesThunk(newTripData.destination));
//   };

//   //origin
//   //destination

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Trip Name:</label>
//         <input type="text" value={name} onChange={handleNameChange} required />
//       </div>
//       <div>
//         <label>From:</label>
//         <CitySearch inputType="from" onCitySelect={handleFromCitySelect} />
//       </div>

//       <div>
//         <label>To:</label>
//         <CitySearch inputType="to" onCitySelect={handleToCitySelect} />
//       </div>
//       <div>
//         <label>Budget:</label>
//         <input
//           type="number"
//           value={budget}
//           onChange={handleBudgetChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="startDate">Start Date:</label>
//         <input
//           type="date"
//           id="startDate"
//           value={startDate}
//           onChange={handleStartDateChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="endDate">End Date:</label>
//         <input
//           type="date"
//           id="endDate"
//           value={endDate}
//           onChange={handleEndDateChange}
//           required
//         />
//       </div>

//       {/* <div>
//         <label>Weather:</label>
//         <select value={weather} onChange={handleWeatherChange} required>
//           <option value="">Select Weather</option>
//           <option value="sunny">Sunny</option>
//           <option value="rainy">Rainy</option>
//           <option value="cold">Cold</option>
//           <option value="windy">Windy</option>
//           <option value="cloudy">Cloudy</option>
//         </select>
//   </div> */}

//       <div>
//         <label>Duration:</label>
//         <input type="text" value={duration} readOnly />
//       </div>

//       {/* <div>
//         <label>Hotel Name:</label>
//         <input
//           type="text"
//           value={hotelName}
//           onChange={handleHotelNameChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Hotel Cost:</label>
//         <input
//           type="number"
//           value={hotelCost}
//           onChange={handleHotelCostChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Hotel URL:</label>
//         <input
//           type="text"
//           value={hotelUrl}
//           onChange={handleHotelUrlChange}
//           required
//         />
//       </div>

//       <div>
//         <label>Flight Airline:</label>
//         <input
//           type="text"
//           value={flightAirline}
//           onChange={handleFlightAirlineChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Flight Cost:</label>
//         <input
//           type="number"
//           value={flightCost}
//           onChange={handleFlightCostChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Flight URL:</label>
//         <input
//           type="text"
//           value={flightUrl}
//           onChange={handleFlightUrlChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Activities:</label>
//         {activities.map((activity, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               value={activity.name}
//               onChange={(e) => handleActivityNameChange(index, e)}
//               placeholder="Activity Name"
//               required
//             />
//             <input
//               type="number"
//               value={activity.cost}
//               onChange={(e) => handleActivityCostChange(index, e)}
//               placeholder="Activity Cost"
//               inputMode="decimal"
//               required
//             />
//             <button type="button" onClick={() => removeActivity(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={addActivity}>
//           Add Activity
//         </button>
//         {activityError && <p>{activityError}</p>}
//       </div> */}
//       <div>
//         <label>Collaborators:</label>
//         <input
//           type="text"
//           value={collaboratorsInput}
//           onChange={handleCollaboratorsInputChange}
//         />
//         <button type="button" onClick={handleAddCollaborator}>
//           Add Collaborator
//         </button>
//         {collaboratorError && <p>{collaboratorError}</p>}
//       </div>

//       {collaborators.length > 0 && (
//         <div>
//           <p>Added Collaborators:</p>
//           <ul>
//             {collaborators.map((collaborator) => (
//               <li key={collaborator.id}>
//                 {collaborator.username}{" "}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveCollaborator(collaborator.id)}
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <button type="submit">Search</button>
//     </form>
//   );
// }

// export default NewTripForm;
