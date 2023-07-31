import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTripThunk, updateTripThunk } from "../redux/trips/trips.actions";
import { useNavigate, useParams } from "react-router-dom";
import "../css/userSettings.css";
import { removeCollaboratorThunk } from "../redux/user/user.actions";

function EditTrip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripId } = useParams();
  const trip = useSelector((state) => state.trips.singleTrip);
  const tripNameRef = useRef(trip.name);
  const [collaborators, setCollaborators] = useState([]);
  const [isSaving, setIsSaving] = useState(false); // Track the saving process

  useEffect(() => {
    dispatch(fetchTripThunk(tripId));
  }, [dispatch, tripId]);

  useEffect(() => {
    if (trip) {
      tripNameRef.current = trip.name;
      setCollaborators(trip.collaborators);
    }
  }, [trip]);

  const handleNameChange = (e) => {
    tripNameRef.current = e.target.value;
  };

  const handleDelete = async (collaborator) => {
    try {
      await dispatch(removeCollaboratorThunk(collaborator.id, tripId));
      const newCollaborators = collaborators.filter(
        (c) => c.id !== collaborator.id
      );
      setCollaborators(newCollaborators);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const updatedTrip = {
      id: tripId,
      name: tripNameRef.current,
      collaborators: collaborators,
    };
    await dispatch(updateTripThunk(updatedTrip));
    const delayDuration = 1000;
    setTimeout(() => {
      navigate(`/trips`);
    }, delayDuration);
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
            defaultValue={tripNameRef.current}
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
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EditTrip;
