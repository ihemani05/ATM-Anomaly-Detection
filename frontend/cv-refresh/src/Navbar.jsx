import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import capitalOneLogo from '/Users/andre/Downloads/pngegg.png'; // Make sure to update the path to your image

function Navbar() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="navbar">
      {!isAuthPage && (
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'navbar-button active' : 'navbar-button')}
        >
          Dashboard
        </NavLink>
      )}
      <img src={capitalOneLogo} alt="Capital One Logo" className="capital-one-logo" style={{ width: '150px', height: 'auto' }} />
      {!isAuthPage && (
        <NavLink
          to="/atms"
          className={({ isActive }) => (isActive ? 'navbar-button atm active' : 'navbar-button atm')}
        >
          ATMs
        </NavLink>
      )}
    </div>
  );
}

export default Navbar;
