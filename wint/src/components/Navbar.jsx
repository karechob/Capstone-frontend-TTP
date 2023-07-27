import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfieImage from "../assets/icons/user2.png";
import Home from "../assets/icons/home2.png";
import Settings from "../assets/icons/settings2.png";
import Logout from "../assets/icons/logout2.png";
import Login from "../assets/icons/login2.png";
import NewTrip from "../assets/icons/new-trip2.png";
import TripHistory from "../assets/icons/trips-history2.png";
import "../css/navBar.css";

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const handleHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/user");
  };

  const handleNewTrip = () => {
    navigate("/new-trip-search");
  };

  const handleTrips = () => {
    navigate("/trips");
  };

  const handleSettings = () => {
    navigate("/userSettings");
  };

  return (
    <div className="nav-outer-container">
      <nav className="nav-container">
        <ul className="nav-links">
          <li className="nav-item">
            <button
              id="home-button"
              onClick={handleHome}
              className="home-nav-button"
            >
              <img src={Home} width="30px" alt="Home"></img>
              <span className="button-text">Home</span>
            </button>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <button
                  id="new-trip-button"
                  onClick={handleNewTrip}
                  className="new-trip-nav-button"
                >
                  <img src={NewTrip} width="30px" alt="New Trip"></img>
                  <span className="button-text">Add Trip</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="profile-button"
                  onClick={handleProfile}
                  className="profile-nav-button"
                >
                  <img src={UserProfieImage} width="30px" alt="Profile"></img>
                  <span className="button-text">Profile</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="trips-button"
                  onClick={handleTrips}
                  className="trips-nav-button"
                >
                  <img src={TripHistory} width="30px" alt="trips"></img>
                  <span className="button-text">History</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="settings-button"
                  onClick={handleSettings}
                  className="settings-nav-button"
                >
                  <img src={Settings} width="30px" alt="Settings"></img>
                  <span className="button-text">Settings</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="logout-button"
                  onClick={handleLogout}
                  className="logout-nav-button"
                >
                  <img src={Logout} width="30px" alt="Logout"></img>
                  <span className="button-text">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <button
                  id="login-button"
                  onClick={handleLogin}
                  className="login-nav-button"
                >
                  <img src={Login} width="30px" alt="Login"></img>
                  <span className="button-text login-button-text">Login</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
