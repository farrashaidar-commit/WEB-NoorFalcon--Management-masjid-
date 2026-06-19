import React from "react";
import { Link } from "react-router-dom";
import FalconMascot from "../components/FalconMascot";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      label: "Jadwal Salat",
      icon: "🕌",
      count: "5 Waktu",
      link: "/jadwal-salat",
      color: "primary",
    },
    {
      label: "Jadwal Imam",
      icon: "👳",
      count: "7 Imam",
      link: "/jadwal-imam",
      color: "secondary",
    },
    {
      label: "Pengumuman",
      icon: "📋",
      count: "3 Baru",
      link: "/pengumuman",
      color: "accent",
    },
    {
      label: "Keuangan",
      icon: "💰",
      count: "Rp 5.2M",
      link: "/keuangan",
      color: "primary",
    },
  ];

  return (
    <div className="dashboard">
      <div
        className="dashboard-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <FalconMascot size={180} />
        <div>
          <h1>Selamat Datang di NoorFalcon 🕌</h1>
          <p>Kelola masjid Anda dengan mudah, terstruktur, dan efisien</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Link
            to={stat.link}
            key={index}
            className={`stat-card ${stat.color}`}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.count}</h3>
              <p>{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="quick-actions">
        <h2>Aksi Cepat</h2>
        <div className="actions-grid">
          <Link to="/jadwal-salat" className="action-btn">
            <span className="action-icon">➕</span>
            <span>Lihat Jadwal Salat</span>
          </Link>
          <Link to="/pengumuman" className="action-btn">
            <span className="action-icon">📝</span>
            <span>Buat Pengumuman</span>
          </Link>
          <Link to="/inventaris" className="action-btn">
            <span className="action-icon">📦</span>
            <span>Cek Inventaris</span>
          </Link>
          <Link to="/donasi" className="action-btn">
            <span className="action-icon">🤲</span>
            <span>Catat Donasi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
