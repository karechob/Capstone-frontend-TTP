import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/userSettings.css";
import { fetchUserThunk, updateUserThunk } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";

function Settings() {
  const user = useSelector((state) => state.user.singleUser);
  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleNameChange = (e) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const handleUsernameChange = (e) => {
    setUserData({ ...userData, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserData({ ...userData, email });
    setEmailError(
      isValidEmail(email) ? "" : "Please enter a valid email address."
    );
  };

  const handleImageChange = (e) => {
    setUserData({ ...userData, image: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setPasswordError(
      isValidPassword(passwordValue)
        ? ""
        : "Password must have at least one uppercase, one lowercase, one number, and one special character."
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail(userData.email) && isValidPassword(password)) {
      setPassword("");
      setPasswordError("");
      const updatedUserData = { ...userData, password: password };

      try {
        dispatch(updateUserThunk(updatedUserData));
        navigate("/user");
      } catch (error) {
        console.error("Error updating user:", error.message);
      }
    }
    console.log("userData after hitting done:", userData);
    dispatch(updateUserThunk(userData)).then(() => {
      navigate("/user");
    });
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return passwordRegex.test(value);
  };

  return (
    <div className="settings-container">
      <h1 className="settings-heading">Settings</h1>

      <form onSubmit={handleSubmit} className="settings-form">
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          id="userName"
          value={userData.name}
          onChange={handleNameChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userData.username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={userData.email}
          onChange={handleEmailChange}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={userData.image}
          onChange={handleImageChange}
        />
        {user && !user.googleId && (
          <>
            <label htmlFor="password">Reset Password:</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password" based on showPassword state
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            <br />
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword">Show password</label>
          </>
        )}
        <button
          type="button"
          className="settings-submit-btn"
          onClick={handleSubmit}
        >
          Done
        </button>
      </form>
    </div>
  );
}

export default Settings;
