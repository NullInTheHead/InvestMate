import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom" 
import "../globals.css"

export default function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Alerts", path: "/alerts" },
    { name: "Market Data", path: "/market-data" },
    { name: "Settings", path: "/settings" },
    { name: "Support", path: "/support" },
  ]

  return (
    <div className="navbar">
      <div className="navbar-main">
        <div className="logo">
          <Link to="/">InvestMate</Link>
        </div>

        <div className="nav-links desktop">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={location.pathname === route.path ? "active" : ""}
            >
              {route.name}
            </Link>
          ))}
        </div>

        <div className="auth-buttons desktop">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

        <button className="menu-button mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu mobile">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onClick={() => setIsMenuOpen(false)}
              className={location.pathname === route.path ? "active" : ""}
            >
              {route.name}
            </Link>
          ))}
          <div className="auth-buttons">
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  )
}
