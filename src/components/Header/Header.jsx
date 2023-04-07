import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button type="button" className="btn btn-link text-white">
                  My Account
                </button>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}
                >
                  {isLoggedIn ? "Sign Out" : "Sign In"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="text-center mb-3">
        <img src="https://i.imgur.com/lhaMADj.jpg" alt="Banner" />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="https://i.imgur.com/uoiaM7q.png"
          alt="Logo"
          className="logo"
        />
      </div>
    </div>
  );
}
