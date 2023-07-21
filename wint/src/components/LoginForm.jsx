// LoginForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserThunk, googleSignInThunk } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setEmailOrUsername("");
    setPassword("");
    setFormError("");
    setSubmitted(false);
    setIsSubmitting(false);
  };

  const handleEmailOrUsernameChange = (e) => {
    setEmailOrUsername(e.target.value);
    setFormError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setIsSubmitting(true);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
    const isNotEmpty = emailOrUsername.trim() !== "" && password.trim() !== "";

    if (!isNotEmpty) {
      setFormError("Please enter a valid email or username and password.");
      setIsSubmitting(false);
      return;
    }

    const userData = {
      email: isValidEmail ? emailOrUsername : null,
      username: isValidEmail ? null : emailOrUsername,
      password: password,
    };

    if (!userData.email && !userData.username) {
      setFormError("Please enter a valid email or username.");
      setIsSubmitting(false);
      return;
    }

    dispatch(loginUserThunk(userData))
      .then(() => {
        resetForm();
        navigate("/user");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setFormError("Invalid email, username, or password.");
        } else {
          setFormError("An error occurred. Please try again later.");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // const handleGoogleSignIn = () => {
  //   window.location.href = "http://localhost:8080/auth/google";
  // };

  // const handleGoogleSignIn = () => {
  //   axios.get()
  //   // dispatch(googleSignInThunk())
  //   //   .then(() => {
  //   //     resetForm();
  //   //     navigate("/user");
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error initiating Google Sign-In:", error);
  //   //   });
  // };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div
      className="login-container"
      tabIndex="0"
      onFocus={() => setFormError("")}
      onKeyDown={handleKeyDown}
    >
      <div className="login-message">LOG IN</div>
      <div className="login-body">
        <div className="login-top"></div>
        <div className="login-bottom"></div>
        <div className="login-center">
          <h2>Please Sign In</h2>
          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={handleEmailOrUsernameChange}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
          />
          {submitted && formError && <p className="login-error">{formError}</p>}
          <button
            type="submit"
            className="login-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Log in"}
          </button>
          <div className="login-separator">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <a
            className="google-login-btn"
            href="http://localhost:8080/auth/google"
          >
            {/* Google image logo */}
            <img
              className="image-button"
              src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg"
              alt="Description of Image"
              width="50"
              height="50"
            />
            {isSubmitting ? "Logging In..." : "Sign in with Google"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
