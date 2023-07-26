import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserThunk, deleteUserThunk } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import { formatDate1 } from "./formatDate";
import "../css/profile.css";

function Profile() {
  const user = useSelector((state) => state.user.singleUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  const handleDeleteProfile = () => {
    dispatch(deleteUserThunk()).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="container">
      <h1 className="profile-card">User Profile</h1>
      <div>
        <img
          className="profile-image"
          src={user.image}
          alt="user profile"
          width="150"
          height="150"
        />
        <div className="profile-info-box">
          <table className="profile-info-table">
            <tbody>
              <tr>
                <td className="profile-info-label">Name:</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td className="profile-info-label">Username:</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td className="profile-info-label">Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td className="profile-info-label">Profile created on:</td>
                <td>{formatDate1(user.createdAt)}</td>
              </tr>
              <tr>
                <td className="profile-info-label">Profile updated on:</td>
                <td>{formatDate1(user.updatedAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <button className="delete-button" onClick={handleDeleteProfile}>
        Delete Profile
      </button>
    </div>
  );
}

export default Profile;
