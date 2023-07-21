import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUserThunk())
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  }, [dispatch, navigate]);

  return (
    <div>
      <h4>Logging out</h4>
    </div>
  );
}

export default Logout;
