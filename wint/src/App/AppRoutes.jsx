import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import TripPage from "../pages/trip";
import UserProfile from "../pages/userProfile";
import UserSettings from "../pages/userSettings";
import NewTrip from "../pages/newTrip";
import Trips from "../pages/trips";
import Test from "../components/test";
import TripHistory from "../pages/triphistory";
import ProtectedRoute from "../components/ProtectedRoute";
import "../css/navBar.css";

const AppRoutes = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/triphistory"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <TripHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Trips />
          </ProtectedRoute>
        }
      />
      <Route
        path="/test"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Test />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trip"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <TripPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-trip"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <NewTrip />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userSettings"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <UserSettings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
