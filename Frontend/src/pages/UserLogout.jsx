import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice.js";

function UserLogout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token=user.token
  console.log(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(logout());
          console.log("token removed:", token);
          navigate("/user/login");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);

        // navigate("/user/login");
      });
  }, [token, navigate]);

  return <div>Logging out...</div>; // Optional: Add a spinner or loader for better UX.
}

export default UserLogout;
