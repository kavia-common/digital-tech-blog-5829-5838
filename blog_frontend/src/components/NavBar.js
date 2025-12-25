import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

// PUBLIC_INTERFACE
function NavBar() {
  /** Main navigation bar with site title and navigation links. Brand color style. */
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-title">
          Digital Tech Blog
        </Link>
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active-link' : undefined}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : undefined}>About</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
