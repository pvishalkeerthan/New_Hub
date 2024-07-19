import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Import CSS for styling

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-header">Registration Page</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label htmlFor="username" className="register-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email" className="register-label">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email address"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="register-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="rePassword" className="register-label">
            Re-enter Password
          </label>
          <input
            type="password"
            id="rePassword"
            placeholder="Re-enter password"
            className="register-input"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register-button">
          Sign Up
        </button>
        <p className="register-login-link">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
