import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("user");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.isAuthenticated);
  const captain = useSelector((state) => state.captain.isAuthenticated);
  useEffect(() => {
    if (captain) {
      navigate("/captain/home");
    } else if (!token || !user) {
      navigate("/user/login");
    }
  }, [token, navigate, user,captain]);

  if (!token) {
    return null;
  }

  return <div>{children}</div>;
};

export default UserProtectedWrapper;
