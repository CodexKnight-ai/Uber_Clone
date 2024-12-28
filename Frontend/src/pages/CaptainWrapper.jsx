import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function CaptainWrapper({ children }) {
//   const token = localStorage.getItem("captain");
  const navigate = useNavigate();
  const captain = useSelector((state) => state.captain.isAuthenticated);
  const user=useSelector((state)=>state.user.isAuthenticated);
  console.log("user:",user);
  console.log("captain:",captain);

  useEffect(() => {
    if(user){
      navigate("/user/home");
    }
    else if(!captain) {
      navigate("/captain/login");
    }
  }, [navigate, captain,user]);

//   if (!token) {
//     return null;
//   }

  return <div>{children}</div>;
}

export {CaptainWrapper};
