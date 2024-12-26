import React from "react";
import axios from "axios";
function UserLogout() {
  const token = localStorage.getItem("token");
  axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return <div></div>;
}

export default UserLogout;