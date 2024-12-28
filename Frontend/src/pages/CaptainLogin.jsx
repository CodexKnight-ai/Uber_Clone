import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../store/captainSlice.js";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // For error messages
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true); // Start loading

    const captain = {
      email: email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain
      );

      if (response.status === 201) {
        const data = response.data.data;
        console.log(data);
        dispatch(login(data));
        console.log(data.token)
        navigate("/captain/home");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false); // Stop loading
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Captain Login"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="password"
          />

          {error && (
            <p className="text-red-500 mb-3 text-center">{error}</p>
          )}

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
            disabled={loading} // Disable while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain/signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/user/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;
