// App.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserThunk,
  logoutUserThunk,
  loginUser,
} from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./App.css";
import AppRoutes from "./AppRoutes";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUserThunk()).then(() => {
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    });
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (storedIsLoggedIn) {
      dispatch(loginUser());
      dispatch(fetchUserThunk());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <AppRoutes isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
