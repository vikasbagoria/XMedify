import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src="/logo.png" alt="Medify Logo" className="logo" />
          <span className="brand-name">Medify</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/search">Find Doctors</Link>
          </li>
          <li>
            <Link to="/">Hospitals</Link>
          </li>
          <li>
            <Link to="/">Medicines</Link>
          </li>
          <li>
            <Link to="/">Surgeries</Link>
          </li>
          <li>
            <Link to="/">Software for Providers</Link>
          </li>
          <li>
            <Link to="/">Facilities</Link>
          </li>
        </ul>

        {/* My Bookings Button */}
        <div className="nav-actions">
          <Link to="/my-bookings" className="btn btn-primary">
            My Bookings
          </Link>
          <div className="user-avatar">Y</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
