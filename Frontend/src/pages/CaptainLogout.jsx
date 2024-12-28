import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/captainSlice.js";

function CaptainLogout() {
  const captain = JSON.parse(localStorage.getItem("captain"));
  const token=captain.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          dispatch(logout());
          console.log("token removed:", token);
          navigate("/captain/login");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        navigate("/captain/login");
      });
  }, [token, navigate, dispatch]);

  return <div>Logging out...</div>; // Optional: Add a spinner or loader for better UX.
}

export default CaptainLogout;
