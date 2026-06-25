import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/jadwal-salat", label: "Jadwal" },
    { to: "/pengumuman", label: "Pengumuman" },
    { to: "/keuangan", label: "Keuangan" },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="footer-brand">
          <span className="footer-kicker">NoorFalcon</span>
          <h3>Sistem manajemen masjid yang rapi, modern, dan profesional.</h3>
          <p>
            Kelola jadwal ibadah, pengumuman, inventaris, keuangan, dan donasi
            dalam satu platform yang tertata.
          </p>
        </div>

        <div className="footer-links">
          <span className="footer-title">Navigasi Cepat</span>
          <div className="footer-link-list">
            {footerLinks.map((item) => (
              <Link key={item.to} to={item.to} className="footer-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-meta">
          <span className="footer-title">Informasi</span>
          <p>Dibangun untuk mendukung operasional masjid agar lebih efisien.</p>
          <span className="footer-copy">
            © {currentYear} NoorFalcon. Semua hak dilindungi.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
