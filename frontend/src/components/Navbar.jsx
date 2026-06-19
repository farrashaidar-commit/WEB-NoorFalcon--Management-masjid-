import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FalconMascot from "./FalconMascot";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("noorfalcon_currentUser"));

  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/jadwal-salat", label: "Jadwal Salat", icon: "🕌" },
    { path: "/jadwal-imam", label: "Jadwal Imam", icon: "👳" },
    { path: "/jadwal-muadzin", label: "Jadwal Muadzin", icon: "📢" },
    { path: "/pengumuman", label: "Pengumuman", icon: "📋" },
    { path: "/inventaris", label: "Inventaris", icon: "📦" },
    { path: "/keuangan", label: "Keuangan", icon: "💰" },
    { path: "/donasi", label: "Donasi", icon: "🤲" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("noorfalcon_currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FalconMascot size={60} />
          <span className="brand-name">NoorFalcon</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div className="nav-right">
          <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`navbar-link ${location.pathname === item.path ? "active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="link-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="user-section">
            <span className="user-name">👋 {currentUser?.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Keluar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
