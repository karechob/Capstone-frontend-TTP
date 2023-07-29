import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTripThunk, updateTripThunk } from "../redux/trips/trips.actions";
import { useNavigate, useParams } from "react-router-dom";
import "../css/userSettings.css";
import { removeCollaboratorThunk } from "../redux/user/user.actions";

function EditTrip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { tripId } = useParams();
  const trip = useSelector((state) => state.trips.singleTrip);
  const [tripName, setTripName] = useState(trip.name);
  const [collaborators, setCollaborators] = useState(trip.collaborators);

  useEffect(() => {
    dispatch(fetchTripThunk(tripId));
  }, []);

  useEffect(() => {
    if (trip) {
      setTripName(trip.name);
      setCollaborators(trip.collaborators);
    }
  }, [trip]);

  const handleNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleDelete = async (name) => {
    console.log(name.id);
    await dispatch(removeCollaboratorThunk(name.id, trip.id));
    const newCollaborators = collaborators.filter(
      (collaborator) => collaborator !== name
    );
    setCollaborators(newCollaborators);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTrip = {
      id: tripId,
      name: tripName,
      collaborators: collaborators,
    };
    await dispatch(updateTripThunk(updatedTrip));
    navigate(`/trip/${tripId}`);
  };

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
                  onClick={() => handleDelete(collaborator, trip.id)}
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
