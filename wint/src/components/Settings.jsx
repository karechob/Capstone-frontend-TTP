import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserThunk, updateUserThunk } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import "../css/userSettings.css";
function Settings() {
  const user = useSelector((state) => state.user.singleUser);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const validateName = () => {
    if (!userData.name.trim()) {
      setNameError("Name cannot be empty.");
    } else {
      setNameError("");
    }
  };

  const validateUsername = () => {
    if (!userData.username.trim()) {
      setUsernameError("Username cannot be empty.");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = () => {
    const isValid = isValidEmail(userData.email);
    setEmailError(isValid ? "" : "Please enter a valid email address.");
  };

  const validatePassword = () => {
    const value = password.trim();
    if (!value) {
      setPasswordError("");
    } else {
      setPasswordError(
        isValidPassword(value)
          ? ""
          : "Password must have at least one uppercase, one lowercase, one number, and one special character."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    validateName();
    validateUsername();
    validateEmail();
    validatePassword();

    if (!nameError && !usernameError && !emailError && !passwordError) {
      const updatedUserData = { ...userData, password };
      try {
        await dispatch(updateUserThunk(updatedUserData));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
        navigate("/user/");
      } catch (error) {
        console.error("Error updating user:", error.message);
        setIsSaving(false);
      }
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
      <form onSubmit={handleSubmit} className="settings-form">
        <h1 class="settings-heading">SETTINGS</h1>
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          id="userName"
          value={userData.name}
          onChange={handleNameChange}
          onBlur={validateName}
        />
        {nameError && <p className="error-message">{nameError}</p>}

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userData.username}
          onChange={handleUsernameChange}
          onBlur={validateUsername}
        />
        {usernameError && <p className="error-message">{usernameError}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={userData.email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
        />
        {emailError && <p className="error-message">{emailError}</p>}

        {user && !user.googleId && (
          <div className="reset-password-container">
            <label htmlFor="password">Reset Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}

            <div className="show-password-container">
              <input
                type="checkbox"
                id="showPassword"
                className="show-password-check-box"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="showPassword">Show password</label>
            </div>
          </div>
        )}

        <button type="submit" className="settings-submit-btn">
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Settings;
