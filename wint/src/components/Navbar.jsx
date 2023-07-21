import React from "react";
import { Link } from "react-router-dom";
import "../css/navBar.css";

const Navbar = ({ handleLogout, isLoggedIn }) => {
  return (
    <nav className="nav-container">
      <ul className="nav-links">
        <li className="nav-item-left">
          <Link to="/" id="home-link">
            Home
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
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
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
  );
};

export default Navbar;
