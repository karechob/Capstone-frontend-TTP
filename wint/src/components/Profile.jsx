import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchUserThunk } from "../redux/user/user.actions";
function Profile() {
  const user = useSelector((state) => state.user.singleUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/userSettings");
  };
  const handleTripsClick = () => {
    navigate("/trips");
  };
  const handleNewTripClick = () => {
    navigate("/new-trip");
  };

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ display: "inline-block" }}>User Profile</h1>
      <button
        style={{ display: "inline-block", marginLeft: "10px" }}
        onClick={handleSettingsClick}
      >
        Settings
      </button>
      <div style={{ textAlign: "center" }}>
        <img
          id="myImage"
          src={user.image}
          alt="user profile"
          width="100"
          height="100"
        />
        <h3>Name: {user.name}</h3>
      </div>
      <button onClick={handleTripsClick}>Trips</button>
      <button onClick={handleNewTripClick}>New Trip</button>
      <hr></hr>
      <p>*Other user Info*</p>
    </div>
  );
}

export default Profile;
