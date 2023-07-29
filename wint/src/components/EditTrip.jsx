import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTripThunk, updateTripThunk } from "../redux/trips/trips.actions";
import { useNavigate, useParams } from "react-router-dom";
import "../css/userSettings.css";

function EditTrip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { tripId } = useParams();
  //console.log("tripId: ", tripId);
  const trip = useSelector((state) => state.trips.singleTrip);

  const [tripName, setTripName] = useState(trip.name);
  const [collaborators, setCollaborators] = useState(trip.collaborators);
  const [hotel, setHotel] = useState(trip.hotel);
  const [flight, setFlight] = useState(trip.flight);
  const [activities, setActivities] = useState(trip.activities);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTrip = {
      tripId: tripId,
      collaborators: collaborators,
    //   hotel: hotel,
    //   flight: flight,
    //   activities: activities,
    };
    console.log("updated trip: ", updatedTrip);
    dispatch(updateTripThunk(updatedTrip));
  };

  useEffect(() => {
    dispatch(fetchTripThunk(tripId));
  }, []);

  //Use to retain the trip name and collaborators when the page is refreshed
  useEffect(() => {
    if (trip) {
      setTripName(trip.name);
      setCollaborators(trip.collaborators);
    }
  }, [trip]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setTripName(name);
  };

  const handleDelete = (name) => {
    const newCollaborators = collaborators.filter(
      (collaborator) => collaborator !== name
    );
    setCollaborators(newCollaborators);
  };

  console.log("trip: ", trip);

  return (
    <div className="settings-container">
      <form onSubmit={handleSubmit} className="settings-form">
        <h1 className="settings-heading">SETTINGS</h1>
        <label htmlFor="tripName">
          Name:{" "}
          <input
            id="tripName"
            type="text"
            value={tripName}
            onChange={handleNameChange}
          />
        </label>

        <div className="collaborators-container">
          <h3>Collaborators</h3>
          <ul>
            {collaborators?.map((collaborator, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => handleDelete(collaborator)}
                  style={{ marginRight: "10px" }}
                >
                  X
                </button>
                {collaborator.name}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="settings-submit-btn">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditTrip;
