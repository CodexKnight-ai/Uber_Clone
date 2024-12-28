import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import AuthProtected from "./pages/AuthProtected";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";
import { CaptainWrapper } from "./pages/CaptainWrapper";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Start />} />
        <Route
          path="/user/login"
          element={
            <AuthProtected>
              <UserLogin />
            </AuthProtected>
          }
        />
        <Route
          path="/user/signup"
          element={
            <AuthProtected>
              <UserSignup />
            </AuthProtected>
          }
        />
        <Route
          path="/captain/login"
          element={
            <AuthProtected>
              <CaptainLogin />
            </AuthProtected>
          }
        />
        <Route
          path="/captain/signup"
          element={
            <AuthProtected>
              <CaptainSignup />
            </AuthProtected>
          }
        />

        {/* User Protected Routes */}
        <Route
          path="/user/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />

        {/* Captain Protected Routes */}
        <Route
          path="/captain/home"
          element={
            <CaptainWrapper>
              <CaptainHome />
            </CaptainWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainWrapper>
              <CaptainLogout />
            </CaptainWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
