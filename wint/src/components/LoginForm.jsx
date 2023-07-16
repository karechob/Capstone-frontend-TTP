import React, { useState } from "react";
import "../css/login.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Perform validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isNotEmpty = email.trim() !== "" && password.trim() !== "";

    if (!isValidEmail || !isNotEmpty) {
      setFormError("Please enter a valid email and password.");
      return;
    }

    // Additional logic for submitting the form
    console.log(email);
    console.log(password);
    setFormError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-message">LOG IN</div>
      <div className="login-body">
        <div className="login-top"></div>
        <div className="login-bottom"></div>
        <div className="login-center">
          <h2>Please Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
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
          <button type="submit" className="login-btn" onClick={handleSubmit}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
