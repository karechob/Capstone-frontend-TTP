import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../css/signup.css";
import { fetchUserThunk, signupUserThunk } from "../redux/user/user.actions";

function SignupForm() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [reEnterPasswordError, setReEnterPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormError("");
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setFormError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setFormError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setFormError("");
  };

  const handleReEnterPasswordChange = (e) => {
    setReEnterPassword(e.target.value);
    setReEnterPasswordError("");
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      emailError ||
      passwordError ||
      reEnterPasswordError ||
      !name ||
      !username ||
      !email ||
      !password ||
      !reEnterPassword
    ) {
      setFormError(
        "You can't sign up. Please fill in all the required fields correctly."
      );
      return;
    }

    console.log(name);
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(reEnterPassword);

    const userData = {
      name: name,
      username: username,
      email: email,
      password: password,
    };

    dispatch(signupUserThunk(userData));

    setName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setReEnterPassword("");
    setFormError("");
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserThunk());
      navigate("/user");
    }
  }, [isLoggedIn, navigate, dispatch]);

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isStrongPassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return passwordRegex.test(value);
  };

  const handleBlurEmail = () => {
    if (email.trim() !== "" && !isValidEmail(email)) {
      setEmailError(
        "Invalid email format. Please enter a valid email address."
      );
    }
  };

  const handleBlurPassword = () => {
    if (password.trim() !== "" && !isStrongPassword(password)) {
      setPasswordError(
        "Password must contain at least one letter, one number, and one special character."
      );
    }
  };

  const handleBlurReEnterPassword = () => {
    if (reEnterPassword.trim() !== "" && reEnterPassword !== password) {
      setReEnterPasswordError(
        "Passwords do not match. Please re-enter the password."
      );
    }
  };

  const handleFocus = () => {
    setFormError("");
  };

  return (
    <div className="signup-container">
      <div className="signup-message">SIGN UP</div>
      <div className="signup-body">
        <div className="signup-top"></div>
        <div className="signup-bottom"></div>
        <div className="signup-center">
          <h2>Please Sign up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            onFocus={handleFocus}
            className="signup-input"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUserNameChange}
            onFocus={handleFocus}
            className="signup-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlurEmail}
            onFocus={handleFocus}
            className="signup-input"
            required
          />
          {emailError && <p className="signup-error">{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handleBlurPassword}
            onFocus={handleFocus}
            className="signup-input"
            required
          />
          {passwordError && <p className="signup-error">{passwordError}</p>}
          <input
            type="password"
            placeholder="Re-enter password"
            value={reEnterPassword}
            onChange={handleReEnterPasswordChange}
            onBlur={handleBlurReEnterPassword}
            onFocus={handleFocus}
            className="signup-input"
            required
          />
          {reEnterPasswordError && (
            <p className="signup-error">{reEnterPasswordError}</p>
          )}
          {submitted && formError && (
            <p className="signup-error">{formError}</p>
          )}
          <button type="submit" className="signup-btn" onClick={handleSubmit}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
