import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppRoutes from "./AppRoutes";
import { fetchUserThunk } from "../redux/user/user.actions";
import Cookies from "js-cookie";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUserThunk()).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserThunk()).catch(() => {});
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <AppRoutes isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
