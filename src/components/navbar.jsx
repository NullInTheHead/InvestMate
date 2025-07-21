import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">InvestMate</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/alerts">Alerts</a></li>
        <li><a href="/market">Market</a></li>
        <li><a href="/settings">Account</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;