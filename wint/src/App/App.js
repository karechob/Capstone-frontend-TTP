import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import TripPage from "../pages/trip";
import logo from "./logo.png";
import UserProfile from "../components/UserProfile";
import UserSettings from "../components/UserSettings";
import Trips from "../pages/trips";
import TripHistory from "../pages/triphistory";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk()).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="App">
      <nav className="nav-container">
        <ul className="nav-links">
          <li className="nav-item-left">
            <Link to="/" id="home-link">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item-right">
                <Link to="/user" id="profile-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item-right">
                {/* <Link to="/" id="logout-link">
                      Logout
                    </Link> */}
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
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
        {/* <Route path="/logout" element={<LogoutPage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/trip" element={<TripPage />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/trips" element={<Trips />} />
        {/* <Route path="/triphistory" element={<TripHistory/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
