import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="app-nav" aria-label="Main Navigation">
      <ul>
        <li><Link to="/" aria-label="Go to Home page">Home</Link></li>
        <li><a href="#about" aria-label="Go to About section">About</a></li>
        <li><a href="#menu" aria-label="Go to Menu section">Menu</a></li>
        <li><Link to="/booking" aria-label="Go to Table Reservation page">Reservations</Link></li>
        <li><a href="#order" aria-label="Go to Order Online section">Order Online</a></li>
        <li><a href="#login" aria-label="Go to Login page">Login</a></li>
      </ul>
    </nav>
  );
};

export default Nav;