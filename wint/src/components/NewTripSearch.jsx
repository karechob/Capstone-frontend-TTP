import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import CitySearch from "./CitySearch";
import { fetchActivitiesThunk } from "../redux/activities/activities.actions";
import "../css/newTripSearch.css";
import { fetchHotelsThunk } from "../redux/hotels/hotels.actions";
import { fetchItinerariesThunk } from "../redux/flights/flights.actions";
import FlightResults from "./FlightResults";
import HotelsResults from "./HotelsResults";
import ActivitiesResults from "./ActivitiesResults";

function NewTripForm() {
  const dispatch = useDispatch();

  const collaborators = useSelector((state) => state.user.collaborators);

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [hotelBudgetRange, setHotelBudgetRange] = useState("");
  const [activitiesBudgetRange, setActivitiesBudgetRange] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBudgetRangeChange = (e) => {
    setHotelBudgetRange(e.target.value);
  };

  const handleActivitiesBudgetRangeChange = (e) => {
    setActivitiesBudgetRange(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    updateDuration(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    updateDuration(startDate, e.target.value);
  };

  const updateDuration = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const durationMilliseconds = endDate.getTime() - startDate.getTime();
      const durationDays =
        Math.floor(durationMilliseconds / (1000 * 60 * 60 * 24)) + 1;
      setDuration(durationDays);
    } else {
      setDuration(0);
    }
  };

  const handleFromCitySelect = (selectedCity) => {
    setOrigin(selectedCity ? selectedCity.name : "");
  };

  const handleToCitySelect = (selectedCity) => {
    setDestination(selectedCity ? selectedCity.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newTripData = {
      name: name,
      origin: origin,
      destination: destination,
      startDate: startDate,
      checkoutDate: checkoutDate,
      endDate: endDate,
      duration: duration,
      hotelBudgetRange: hotelBudgetRange,
      activitiesBudgetRange: activitiesBudgetRange,
    };
    console.log(newTripData);

    try {
      await dispatch(fetchItinerariesThunk(newTripData));
      await dispatch(fetchHotelsThunk(newTripData));
      await dispatch(fetchActivitiesThunk(newTripData));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    setLoading(false);
    }
  };

  const [todayDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  return (
    <div className="search-page-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="new-trip-form">
          <div className="form-header">
            <h1 className="header">CREATE A TRIP</h1>
          </div>
          <div className="new-trip-form-group">
            <label className="new-trip-form-label"></label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              placeholder="Enter Name of Trip"
              className="new-trip-form-input"
            />
          </div>
          <div className="new-trip-form-group">
            <label className="new-trip-form-label"></label>
            <CitySearch
              inputType="from"
              onCitySelect={handleFromCitySelect}
              placeholder="Departing from?"
            />
          </div>
          <div className="new-trip-form-group">
            <label className="new-trip-form-label"></label>
            <CitySearch
              inputType="to"
              onCitySelect={handleToCitySelect}
              placeholder="Going to?"
            />
          </div>

          <div className="new-trip-form-group">
            <label htmlFor="startDate" className="new-trip-form-label"></label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              required
              min={todayDate}
              data-placeholder="Departure Date"
              className="new-trip-form-input"
            />
          </div>
          <div className="new-trip-form-group">
            <label htmlFor="endDate" className="new-trip-form-label"></label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              required
              data-placeholder="Return Date"
              min={startDate || todayDate}
              className="new-trip-form-input"
            />
          </div>
          <div className="new-trip-form-group">
            <select
              id="budgetRange"
              value={hotelBudgetRange}
              onChange={handleBudgetRangeChange}
              required
              className="new-trip-form-input"
            >
              <option value="">Select Hotel Budget Range</option>
              <option value="price::USD-0-199">&lt; $200</option>
              <option value="price::USD-200-400">$200 - $400</option>
              <option value="price::USD-400-600">$400 - $600</option>
              <option value="price::USD-600-800">$600 - $800</option>
              <option value="price::USD-800-10000">&gt; $800</option>
            </select>
          </div>
          <div className="new-trip-form-group">
            <select
              id="activitiesBudgetRange"
              value={activitiesBudgetRange}
              onChange={handleActivitiesBudgetRangeChange}
              required
              className="new-trip-form-input"
            >
              <option value="">Select Activities Budget Range</option>
              <option value="1">Cheap ($)</option>
              <option value="2">Mid-range ($$)</option>
              <option value="3">Expensive ($$$)</option>
            </select>
          </div>

          <button
            type="submit"
            className={classNames("new-trip-search-btn", {
              "loading-btn": loading,
            })}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>
        <div>
          <FlightResults />
          <HotelsResults />
          <ActivitiesResults />
        </div>
      </div>
    </div>
  );
}

export default NewTripForm;

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
//       dispatch(addCollaborator(collaboratorData));
//       setCollaboratorsDeleteStatus(false);
//       setCollaboratorsInput("");
//     } catch (error) {
//       console.error("Error handling collaborator:", error);
//     }
//   };

//   const handleRemoveCollaborator = (collaboratorId) => {
//     dispatch(removeCollaborator(collaboratorId));
//     setCollaboratorsDeleteStatus(true);
//   };

// {
//   /* <div className="form-group">
//         <label className="form-label">Collaborators:</label>
//         <div className="collaborators">
//           {collaborators.map((collaborator, index) => (
//             <div key={index} className="collaborator">
//               <span className="collaborator-name">{collaborator.username}</span>
//               <button
//                 type="button"
//                 onClick={() => handleRemoveCollaborator(collaborator.id)}
//                 className="remove-collaborator-btn"
//               >
//                 x
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="collaborators-input-container">
//           <input
//             type="text"
//             value={collaboratorsInput}
//             onChange={handleCollaboratorsInputChange}
//             className="collaborators-input"
//           />
//           <button
//             type="button"
//             onClick={handleAddCollaborator}
//             className="add-collaborator-btn"
//           >
//             +
//           </button>
//         </div>
//         {collaboratorError && (
//           <p className="collaborator-error">{collaboratorError}</p>
//         )}
//       </div> */
// }
