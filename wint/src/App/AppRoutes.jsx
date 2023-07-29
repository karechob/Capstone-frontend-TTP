import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import TripPage from "../pages/trip";
import UserProfile from "../pages/userProfile";
import UserSettings from "../pages/userSettings";
import Avatar from "../pages/avatar";
import NewTrip from "../pages/newTrip";
import NewTripSearch from "../pages/newTripSearch";
import Trips from "../pages/trips";
import Test from "../components/test";
import TripHistory from "../pages/triphistory";
import ProtectedRoute from "../components/ProtectedRoute";
import EditTrip from "../components/EditTrip";
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
        path="/user/avatar"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Avatar />
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
        path="/trip/:tripId"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <TripPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-trip/:tripId"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <EditTrip />
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
        path="/new-trip-search"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <NewTripSearch />
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
