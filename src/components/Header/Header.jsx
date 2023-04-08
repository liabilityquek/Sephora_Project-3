import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const isSignedIn = false; // Replace with your logic for checking if the user is signed in

  return (
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link border-end text-white" to="/my-account">
                My Account
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin Tools
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/productpage">
                    Product Portfolio
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/adminlocation">
                    Inventory Management
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin">
                    Staff Scheduling
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isSignedIn ? (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/sign-out">
                  Sign Out
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/sign-in">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
