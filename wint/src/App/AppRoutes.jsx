import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import TripPage from "../pages/trip";
import UserProfile from "../components/UserProfile";
import UserSettings from "../components/UserSettings";
import Trips from "../pages/Trips";
import TripHistory from "../pages/TripHistory";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/trip" element={<TripPage />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/userSettings" element={<UserSettings />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/triphistory" element={<TripHistory />} />
    </Routes>
  );
};

export default AppRoutes;
