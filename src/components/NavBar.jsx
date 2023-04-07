import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utilities/users-service";

export default function NavBar({ setUser }) {
  const token = localStorage.getItem("token")
  const Name =  token ? JSON.parse(window.atob(token.split(".")[1])) : null;
  const customerName = Name && Name.customer.name ? Name.customer.name : "";
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    logout();
    navigate("/login");
  };

  return (
    <>
      {setUser ? <p>Hello {customerName}</p> : null}

      <nav>
        <ul>
          <li>
            <NavLink to="/adminlocation">Inventory Management</NavLink>
            <NavLink to="/maps">Locate Us</NavLink>
            <NavLink to="/booking">Appointment Booking</NavLink>
            <NavLink to="/history">Upcoming Appointments</NavLink>
          </li>
          {setUser && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
