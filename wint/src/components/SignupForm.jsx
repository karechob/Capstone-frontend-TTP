import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUserThunk } from "../redux/user/user.actions";
import "../css/signup.css";

function SignupForm() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    reEnterPassword: false,
  });

  const resetForm = () => {
    setName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setReEnterPassword("");
    setEmailError("");
    setPasswordError("");
    setReEnterPasswordError("");
    setFormError("");
    setSubmitted(false);
    setIsSubmitting(false);
    setHasError({
      name: false,
      username: false,
      email: false,
      password: false,
      reEnterPassword: false,
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormError("");
    setHasError((prevState) => ({ ...prevState, name: false }));
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setFormError("");
    setHasError((prevState) => ({ ...prevState, username: false }));
  };

  const handleEmailChange = (e) => {
    const lowercaseEmail = e.target.value.toLowerCase();
    setEmail(lowercaseEmail);
    setEmailError("");
    setFormError("");
    setHasError((prevState) => ({ ...prevState, email: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setFormError("");
    setHasError((prevState) => ({ ...prevState, password: false }));
  };

  const handleReEnterPasswordChange = (e) => {
    setReEnterPassword(e.target.value);
    setReEnterPasswordError("");
    setFormError("");
    setHasError((prevState) => ({ ...prevState, reEnterPassword: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !reEnterPassword ||
      emailError ||
      passwordError ||
      reEnterPasswordError
    ) {
      setFormError(
        "You can't sign up. Please fill in all the required fields correctly."
      );
      setHasError({
        name: !name,
        username: !username,
        email: !email,
        password: !password,
        reEnterPassword: !reEnterPassword,
      });
      return;
    }

    setIsSubmitting(true);

    const userData = {
      name: name,
      username: username,
      email: email,
      password: password,
    };

    dispatch(signupUserThunk(userData))
      .then(() => {
        resetForm();
        navigate("/user");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            setFormError("Username or email already exists.");
          } else {
            setFormError("Something went wrong. Please try again later.");
          }
        } else {
          setFormError("Something went wrong. Please try again later.");
        }
        setHasError({
          name: false,
          username: false,
          email: false,
          password: false,
          reEnterPassword: false,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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
      setHasError((prevState) => ({ ...prevState, email: true }));
    }
  };

  const handleBlurPassword = () => {
    if (password.trim() !== "" && !isStrongPassword(password)) {
      setPasswordError(
        "Password must contain at least one uppercase, one lowercase, one number, and one special character."
      );
      setHasError((prevState) => ({ ...prevState, password: true }));
    }
  };

  const handleBlurReEnterPassword = () => {
    if (reEnterPassword.trim() !== "" && reEnterPassword !== password) {
      setReEnterPasswordError(
        "Passwords do not match. Please re-enter the password."
      );
      setHasError((prevState) => ({ ...prevState, reEnterPassword: true }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="signup-container" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="signup-message">SIGN UP</div>
      <div className="signup-body">
        <div className="signup-top"></div>
        <div className="signup-bottom"></div>
        <div className="signup-center">
          <p className="signup-header">Join WINT today</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className={`signup-input ${
              hasError.name ? "signup-input-invalid" : ""
            }`}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUserNameChange}
            className={`signup-input ${
              hasError.username ? "signup-input-invalid" : ""
            }`}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlurEmail}
            className={`signup-input ${
              hasError.email ? "signup-input-invalid" : ""
            }`}
            required
          />
          {emailError && <p className="signup-error">{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handleBlurPassword}
            className={`signup-input ${
              hasError.password ? "signup-input-invalid" : ""
            }`}
            required
          />
          {passwordError && <p className="signup-error">{passwordError}</p>}
          <input
            type="password"
            placeholder="Re-enter password"
            value={reEnterPassword}
            onChange={handleReEnterPasswordChange}
            onBlur={handleBlurReEnterPassword}
            className={`signup-input ${
              hasError.reEnterPassword ? "signup-input-invalid" : ""
            }`}
            required
          />
          {reEnterPasswordError && (
            <p className="signup-error">{reEnterPasswordError}</p>
          )}
          {submitted && formError && (
            <p className="signup-error">{formError}</p>
          )}
          <button type="submit" className="signup-btn" onClick={handleSubmit}>
            {isSubmitting ? "Signing Up..." : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
