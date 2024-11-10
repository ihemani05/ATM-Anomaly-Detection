import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <div className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'navbar-button active' : 'navbar-button')}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/atms"
        className={({ isActive }) => (isActive ? 'navbar-button active' : 'navbar-button')}
      >
        ATMs
      </NavLink>
    </div>
  );
}

export default Navbar;
