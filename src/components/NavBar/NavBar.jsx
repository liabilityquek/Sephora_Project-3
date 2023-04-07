import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <ul className="navbar-nav justify-content-center">
        <li className="nav-item">
          <NavLink className="nav-link text-black nav-link-hover" to="/">
            Browse Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-black nav-link-hover" to="/booking">
            Book an Appointment
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
