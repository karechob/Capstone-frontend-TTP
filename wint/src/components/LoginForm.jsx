// LoginForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isGoogleLoginSubmitting, setIsGoogleLoginSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const resetForm = () => {
    setEmailOrUsername("");
    setPassword("");
    setFormError("");
    setSubmitted(false);
    setIsLoginSubmitting(false);
    setIsGoogleLoginSubmitting(false);
    setHasError(false);
  };

  const handleEmailOrUsernameChange = (e) => {
    setEmailOrUsername(e.target.value);
    setFormError("");
    setHasError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormError("");
    setHasError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setIsLoginSubmitting(true);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
    const isNotEmpty = emailOrUsername.trim() !== "" && password.trim() !== "";

    if (!isNotEmpty) {
      setFormError("Please enter a valid email or username and password.");
      setIsLoginSubmitting(false);
      setHasError(true);
      return;
    }

    const userData = {
      email: isValidEmail ? emailOrUsername : null,
      username: isValidEmail ? null : emailOrUsername,
      password: password,
    };

    if (!userData.email && !userData.username) {
      setFormError("Please enter a valid email or username.");
      setIsLoginSubmitting(false);
      setHasError(true);
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
        setHasError(true);
      })
      .finally(() => {
        setIsLoginSubmitting(false);
      });
  };

  const handleFocus = () => {
    setFormError("");
    setHasError(false);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoginSubmitting(true);
    window.location.href = "https://capstone-backend-ttp.vercel.app/auth/google";
    sessionStorage.setItem("isLoggedIn", "true");
  };

  return (
    <div className="login-container">
      <div className="login-message">LOG IN</div>
      <div className="login-body">
        <div className="login-top"></div>
        <div className="login-bottom"></div>
        <div className="login-center">
          <p className="login-header">Sign in to WINT</p>
          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onFocus={handleFocus}
            onChange={handleEmailOrUsernameChange}
            className={`login-input ${
              submitted && emailOrUsername.trim() === ""
                ? "login-input-invalid"
                : ""
            } ${hasError ? "login-input-error" : ""}`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onFocus={handleFocus}
            onChange={handlePasswordChange}
            className={`login-input ${
              submitted && password.trim() === "" ? "login-input-invalid" : ""
            } ${hasError ? "login-input-error" : ""}`}
          />
          {submitted && formError && <p className="login-error">{formError}</p>}
          <button
            type="submit"
            className="login-btn"
            onClick={handleSubmit}
            disabled={isLoginSubmitting}
          >
            {isLoginSubmitting ? "Logging In..." : "Log in"}
          </button>
          <div className="login-separator">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <button
            type="submit"
            className="google-login-btn"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoginSubmitting}
          >
            {isGoogleLoginSubmitting ? "Logging In..." : "Sign in with Google"}
          </button>
          <div className="signup-link" onClick={() => navigate("/signup")}>
            Don't have an account?{" "}
            <span className="signup-link-span">Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
