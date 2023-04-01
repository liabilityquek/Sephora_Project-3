import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/booking">Appointment Booking</NavLink>
          <NavLink to="/adminlocation">Inventory Management</NavLink>
        </li>
        <button>Logout</button>
      </ul>
    </nav>
  );
}
