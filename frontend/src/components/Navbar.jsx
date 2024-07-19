// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  const { authenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand mr-auto" to="/home">Learn Hub.</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            {authenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            )}
            <li className="nav-item">
              {authenticated ? (
                <button className="nav-link" onClick={logout}>Logout</button>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
