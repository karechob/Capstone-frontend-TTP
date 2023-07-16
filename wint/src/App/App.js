import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import logo from "./logo.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="nav-container">
          <ul className="nav-links">
            <li className="nav-item-left">
              <Link to="/" id="home-link">
                <img src={logo} alt="Logo" className="logo-img" />
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item-right">
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item-right">
                  <Link to="/login" id="login-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item-right">
                  <Link to="/signup" id="signup-link">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;