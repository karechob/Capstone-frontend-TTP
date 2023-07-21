// App.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserThunk,
  logoutUserThunk,
} from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./App.css";
import AppRoutes from "./AppRoutes";

//all permissions have to come from here (not inside redux)
//no need for localstorage

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk()).then(() => {
      navigate("/");
    });
  };

  const isLoggedIn = useSelector(state => !!state.user.singleUser.email);
  useEffect(() => {
    dispatch(fetchUserThunk())
  }, [dispatch, isLoggedIn]);
  console.log("this is isloggedin", isLoggedIn)


  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} />
      <AppRoutes  />
    </div>
  );
}

export default App;
