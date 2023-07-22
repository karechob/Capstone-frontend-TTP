import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../css/userSettings.css";

function Settings() {
  const user = useSelector((state) => state.user.singleUser);
  const [userData, setUserData] = useState(user);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

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
    }
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
      <h1 className="settings-heading">Edit User</h1>

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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        <br />
        <button type="submit" className="settings-submit-btn">
          Done
        </button>
      </form>
    </div>
  );
}

export default Settings;
