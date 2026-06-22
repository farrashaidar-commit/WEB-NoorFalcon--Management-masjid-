import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("noorfalcon_currentUser"));

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/jadwal-salat", label: "Jadwal Salat" },
    { path: "/jadwal-imam", label: "Jadwal Imam" },
    { path: "/jadwal-muadzin", label: "Jadwal Muadzin" },
    { path: "/pengumuman", label: "Pengumuman" },
    { path: "/inventaris", label: "Inventaris" },
    { path: "/keuangan", label: "Keuangan" },
    { path: "/donasi", label: "Donasi" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("noorfalcon_currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-copy">
            <span className="brand-kicker">Sistem Manajemen Masjid</span>
            <span className="brand-name">NoorFalcon</span>
          </div>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        >
          {isMenuOpen ? "Tutup" : "Menu"}
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
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="user-section">
            <div className="user-copy">
              <span className="user-label">Masuk sebagai</span>
              <span className="user-name">{currentUser?.username || "Pengguna"}</span>
            </div>
            <button
              className="logout-btn"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
