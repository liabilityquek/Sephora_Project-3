import { NavLink } from "react-router-dom";

export default function NavBar() {

  return (
    <nav>
      <ul>

        <li>
          <NavLink to="/booking">Appointment Booking</NavLink>
        </li>
        <button>Logout</button>
      </ul>
    </nav>
  );
}