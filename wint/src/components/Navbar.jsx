import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfieImage from "../assets/icons/user.png";
import Home from "../assets/icons/home.png";
import Settings from "../assets/icons/settings.png";
import Logout from "../assets/icons/logout.png";
import Login from "../assets/icons/login.png";
import NewTrip from "../assets/icons/new-trip.png";
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
    navigate("/new-trip");
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
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="profile-button"
                  onClick={handleProfile}
                  className="profile-nav-button"
                >
                  <img src={UserProfieImage} width="30px" alt="Profile"></img>
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="settings-button"
                  onClick={handleSettings}
                  className="settings-nav-button"
                >
                  <img src={Settings} width="30px" alt="Settings"></img>
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="logout-button"
                  onClick={handleLogout}
                  className="logout-nav-button"
                >
                  <img src={Logout} width="30px" alt="Logout"></img>
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
