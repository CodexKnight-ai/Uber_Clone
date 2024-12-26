import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserContext from "./context/UserContext";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";

function App() {
  return (
    <div>
      <UserContext>
        <Routes>
          <Route path="/" element={<Start />} />

          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />

          <Route path="/captain/login" element={<CaptainLogin />} />
          <Route path="/captain/signup" element={<CaptainSignup />} />

          <Route
            path="/user/home"
            element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            }
          />
          <Route path="/user/logout" element={<UserLogout />} />
        </Routes>
      </UserContext>
    </div>
  );
}

export default App;
