import React, { useState, useEffect } from "react";
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
import { fetchCollaboratorThunk } from "../redux/user/user.actions";
import { addTripThunk, fetchAllTripsThunk } from "../redux/trips/trips.actions";
import { useNavigate } from "react-router-dom";

function NewTripForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collaborator = useSelector(
    (state) => state.user.collaborator.collaborator
  );
  const [budget, setBudget] = useState(0);
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const [collaboratorsInput, setCollaboratorsInput] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [collaboratorError, setCollaboratorError] = useState("");
  const [collaboratorsDeleteStatus, setCollaboratorsDeleteStatus] =
    useState(false);
  const [duration, setDuration] = useState(0);
  const [originalFlightCost, setOriginalFlightCost] = useState(0);
  const [originalHotelCost, setOriginalHotelCost] = useState(0);
  const [flight, setFlight] = useState({
    airline: "",
    cost: 0,
    link: "",
  });

  const [hotel, setHotel] = useState({
    name: "",
    cost: 0,
    link: "",
  });

  const [activities, setActivities] = useState([]);
  const [activitiesCostSum, setActivitiesCostSum] = useState(0);

  const [hotelBudgetRange, setHotelBudgetRange] = useState("");
  const [activitiesBudgetRange, setActivitiesBudgetRange] = useState("");

  console.log(hotelBudgetRange);

  useEffect(() => {
    if (
      collaborator &&
      !collaboratorsDeleteStatus &&
      !collaborators.find(
        (c) =>
          c.username === collaborator.username || c.email === collaborator.email
      )
    ) {
      setCollaborators((prevCollaborators) => [
        ...prevCollaborators,
        collaborator,
      ]);
      setCollaboratorsInput("");
    }
  }, [collaborator, collaborators, collaboratorsDeleteStatus]);

  useEffect(() => {
    setCollaborators([]);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBudgetRangeChange = (e) => {
    setHotelBudgetRange(e.target.value);
  };

  console.log(handleBudgetRangeChange);

  const handleActivitiesBudgetRangeChange = (e) => {
    setActivitiesBudgetRange(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    updateDuration(e.target.value, endDate);
    const startDateValue = new Date(e.target.value);
    startDateValue.setDate(startDateValue.getDate() + 1);
    const formattedCheckoutDate = startDateValue.toISOString().slice(0, 10);
    setCheckoutDate(formattedCheckoutDate);
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
      const durationDays = Math.floor(
        durationMilliseconds / (1000 * 60 * 60 * 24)
      );
      setDuration(durationDays);
    } else {
      setDuration(0);
    }
  };

  const handleCollaboratorsInputChange = (e) => {
    setCollaboratorsInput(e.target.value);
    setCollaboratorError("");
  };

  const handleAddCollaborator = async () => {
    try {
      if (!collaboratorsInput.trim()) {
        setCollaboratorError("Collaborator input is empty");
        return;
      }
      setCollaboratorError("");

      const collaboratorData = {};
      if (collaboratorsInput.includes("@")) {
        collaboratorData.email = collaboratorsInput;
      } else {
        collaboratorData.username = collaboratorsInput;
      }

      if (
        collaborators.find(
          (c) =>
            c.username === collaboratorData.username ||
            c.email === collaboratorData.email
        )
      ) {
        setCollaboratorError("Collaborator already exists");
        return;
      }

      dispatch(fetchCollaboratorThunk(collaboratorData)).catch((error) => {
        console.error("Error fetching collaborator:", error);
        setCollaboratorError("Collaborator not found");
      });
      setCollaboratorsDeleteStatus(false);
      setCollaboratorsInput("");
    } catch (error) {
      console.error("Error handling collaborator:", error);
    }
  };

  const handleRemoveCollaborator = (collaboratorId) => {
    const updatedCollaborators = collaborators.filter(
      (collaborator) => collaborator.id !== collaboratorId
    );
    setCollaborators(updatedCollaborators);
    setCollaboratorsDeleteStatus(true);
  };

  const handleFromCitySelect = (selectedCity) => {
    setOrigin(selectedCity ? selectedCity.name : "");
  };

  const handleToCitySelect = (selectedCity) => {
    setDestination(selectedCity ? selectedCity.name : "");
  };

  const renderCollaborators = () => {
    return collaborators.map((collaborator) => (
      <div key={collaborator.id} className="collaborator">
        <span className="collaborator-name">{collaborator.username}</span>
        <button
          type="button"
          onClick={() => handleRemoveCollaborator(collaborator.id)}
          className="remove-collaborator-btn"
        >
          x
        </button>
      </div>
    ));
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearching(true);
    const newTripData = {
      name: name,
      origin: origin,
      destination: destination,
      startDate: startDate,
      checkoutDate: checkoutDate,
      endDate: endDate,
      hotelBudgetRange: "price::USD-0-10000",
      activitiesBudgetRange: activitiesBudgetRange,
      collaborators: collaborators,
      duration: duration,
    };
    console.log(newTripData);
    try {
      await dispatch(fetchItinerariesThunk(newTripData));
      await dispatch(fetchHotelsThunk(newTripData));
      await dispatch(fetchActivitiesThunk(newTripData));
      await dispatch(fetchActivitiesThunk(newTripData));
      setLoading(false);
      setSearching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setSearching(false);
    }
  };

  const [todayDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  useEffect(() => {
    const adjustedFlightCost = originalFlightCost * (collaborators.length + 1);
    setFlight((prevFlight) => ({
      ...prevFlight,
      cost: roundToTwoDecimalPlaces(adjustedFlightCost),
    }));

    const adjustedHotelCost =
      originalHotelCost * ((collaborators.length + 1) / 2) * duration;

    setHotel((prevHotel) => ({
      ...prevHotel,
      cost: roundToTwoDecimalPlaces(adjustedHotelCost),
    }));

    const totalCost = adjustedFlightCost + adjustedHotelCost * duration;
    setBudget(totalCost);
  }, [collaborators, originalFlightCost, originalHotelCost, duration]);

  const roundToTwoDecimalPlaces = (num) => {
    return parseFloat(num).toFixed(2);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    let totalCost = parseFloat(originalFlightCost + originalHotelCost);
    if (collaborators.length > 0) {
      const adjustedFlightCost =
        originalFlightCost * (collaborators.length + 1);
      setFlight((prevFlight) => ({
        ...prevFlight,
        cost: adjustedFlightCost,
      }));

      const adjustedHotelCost = originalHotelCost * ((collaborators.length + 1) / 2) * duration;
      // originalHotelCost * Math.ceil(collaborators.length / 2) * duration;
      setHotel((prevHotel) => ({
        ...prevHotel,
         cost: adjustedHotelCost,
      }));
      totalCost = originalFlightCost * (collaborators.length + 1);
      totalCost +=
        originalHotelCost * Math.ceil(collaborators.length / 2) * duration;
    }

    totalCost += activitiesCostSum;

    setBudget(totalCost);

    e.preventDefault();
    const tripData = {
      name: name,
      origin: origin,
      destination: destination,
      budget: totalCost,
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      hotel: hotel,
      flight: flight,
      activities: activities,
      collaborators: collaborators,
    };

    console.log(budget);

    try {
      dispatch(addTripThunk(tripData));
      dispatch(fetchAllTripsThunk());
      const delayDuration = 1000;
      setTimeout(() => {
        navigate("/trips");
      }, delayDuration);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitSearch} className="new-trip-form">
        <div className="new-trip-form-group">
          <label className="new-trip-form-label">Trip Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            placeholder="Enter name of trip"
            className="new-trip-form-input"
          />
        </div>
        <div className="new-trip-form-group">
          <label className="new-trip-form-label">From:</label>
          <CitySearch inputType="from" onCitySelect={handleFromCitySelect} />
        </div>
        <div className="new-trip-form-group">
          <label className="new-trip-form-label">To:</label>
          <CitySearch inputType="to" onCitySelect={handleToCitySelect} />
        </div>

        <div className="new-trip-form-group">
          <label htmlFor="startDate" className="new-trip-form-label">
            Depart:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            required
            min={todayDate}
            data-placeholder="Add date"
            className="new-trip-form-input"
          />
        </div>
        <div className="new-trip-form-group">
          <label htmlFor="endDate" className="new-trip-form-label">
            Return:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            required
            data-placeholder="Add date"
            min={startDate || todayDate}
            className="new-trip-form-input"
          />
        </div>
        {/* <div className="new-trip-form-group">
          <label htmlFor="budgetRange" className="new-trip-form-label">
            Hotel Budget:
          </label>
          <select
            id="budgetRange"
            value={hotelBudgetRange}
            onChange={handleBudgetRangeChange}
            required
            className="new-trip-form-input"
          >
            <option value="">Select hotel budget range</option>
            <option value="price::USD-0-199">&lt; $200</option>
            <option value="price::USD-200-400">$200 - $400</option>
            <option value="price::USD-400-600">$400 - $600</option>
            <option value="price::USD-600-800">$600 - $800</option>
            <option value="price::USD-800-10000">&gt; $800</option>
          </select>
        </div> */}
        <div className="new-trip-form-group">
          <label
            htmlFor="activitiesBudgetRange"
            className="new-trip-form-label"
          >
            Activities Budget Range:
          </label>
          <select
            id="activitiesBudgetRange"
            value={activitiesBudgetRange}
            onChange={handleActivitiesBudgetRangeChange}
            required
            className="new-trip-form-input"
          >
            <option value="">Select activities budget tange</option>
            <option value="$">Cheap ($)</option>
            <option value="$$">Mid-range ($$)</option>
            <option value="$$$">Expensive ($$$)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="new-trip-form-label">Collaborators:</label>
          <div className="collaborators">{renderCollaborators()}</div>
          <div className="collaborators-input-container">
            <input
              type="text"
              placeholder="Enter username or email"
              value={collaboratorsInput}
              onChange={handleCollaboratorsInputChange}
              className="new-trip-form-input"
            />
            {collaboratorError && (
              <p className="collaborator-error">{collaboratorError}</p>
            )}
            <button
              type="button"
              onClick={handleAddCollaborator}
              className="add-collaborator-btn"
            >
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={classNames("new-trip-search-btn", {
            "loading-btn": searching,
          })}
          disabled={searching}
        >
          {" "}
          {loading && searching ? "Searching..." : "Search"}
        </button>
      </form>

      {loading ? (
        <p></p>
      ) : (
        <>
          <FlightResults
            setFlight={setFlight}
            setOriginalFlightCost={setOriginalFlightCost}
          />
          <HotelsResults
            setHotel={setHotel}
            setOriginalHotelCost={setOriginalHotelCost}
          />
          <ActivitiesResults
            setActivities={setActivities}
            activitiesCostSum={activitiesCostSum}
            setActivitiesCostSum={setActivitiesCostSum}
          />
          <button onClick={handleSubmission}>Submit Search</button>
        </>
      )}
    </div>
  );
}

export default NewTripForm;
