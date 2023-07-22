import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUserThunk, setLoginStatus } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk()).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      dispatch(setLoginStatus(true));
    } else {
      dispatch(setLoginStatus(false));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} />
      <AppRoutes />
    </div>
  );
}

export default App;
