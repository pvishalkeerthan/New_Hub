
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; 
import { useAuth } from './AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true } 
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        login(); // Update authenticated state
        navigate("/courses");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-header">Welcome Back!</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label htmlFor="email" className="login-label">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email address"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="login-register-link">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register here!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
