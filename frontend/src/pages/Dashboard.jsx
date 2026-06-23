import React from "react";
import { Link } from "react-router-dom";
import FalconMascot from "../components/FalconMascot";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      eyebrow: "Penjadwalan",
      label: "Jadwal Terpadu",
      count: "3 Bagian",
      description:
        "Pantau jadwal salat, penugasan imam, dan muadzin dalam satu halaman terpusat.",
      link: "/jadwal-salat",
      color: "primary",
    },
    {
      eyebrow: "Operasional",
      label: "Petugas Ibadah",
      count: "Imam & Muadzin",
      description:
        "Pastikan susunan petugas ibadah tersusun rapi dan mudah diperbarui setiap saat.",
      link: "/jadwal-salat",
      color: "secondary",
    },
    {
      eyebrow: "Informasi",
      label: "Pengumuman",
      count: "3 Baru",
      description:
        "Kelola informasi penting masjid agar jamaah selalu mendapatkan update terbaru.",
      link: "/pengumuman",
      color: "accent",
    },
    {
      eyebrow: "Keuangan",
      label: "Keuangan",
      count: "Rp 5.2M",
      description:
        "Lihat ringkasan arus keuangan dan pencatatan dana dengan tampilan yang lebih jelas.",
      link: "/keuangan",
      color: "primary",
    },
  ];

  const quickActions = [
    {
      title: "Lihat Jadwal Terpadu",
      description:
        "Buka seluruh susunan jadwal ibadah dan petugas dalam satu tampilan.",
      link: "/jadwal-salat",
      linkLabel: "Buka Jadwal",
    },
    {
      title: "Buat Pengumuman",
      description:
        "Sampaikan informasi terbaru untuk jamaah dengan format yang lebih tertata.",
      link: "/pengumuman",
      linkLabel: "Kelola Pengumuman",
    },
    {
      title: "Cek Inventaris",
      description:
        "Pantau perlengkapan dan kebutuhan operasional masjid secara lebih mudah.",
      link: "/inventaris",
      linkLabel: "Lihat Inventaris",
    },
    {
      title: "Catat Donasi",
      description:
        "Input donasi masuk dengan proses yang cepat dan tetap terorganisir.",
      link: "/donasi",
      linkLabel: "Kelola Donasi",
    },
  ];

  const highlights = [
    {
      title: "Tampilan Lebih Fokus",
      description:
        "Susunan informasi dibuat lebih lega dan tersegmentasi agar nyaman saat dipakai harian.",
    },
    {
      title: "Navigasi Lebih Cepat",
      description:
        "Setiap blok dashboard langsung mengarahkan ke halaman kerja utama tanpa elemen yang mengganggu.",
    },
    {
      title: "Cocok Untuk Admin",
      description:
        "Dashboard dirancang agar terlihat profesional saat dipakai untuk operasional masjid yang serius.",
    },
  ];

  return (
    <div className="dashboard">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <span className="dashboard-kicker">Dashboard Utama</span>
          <h1>
            Kelola operasional masjid dengan tampilan yang lebih rapi, modern,
            dan profesional.
          </h1>
          <p>
            NoorFalcon membantu Anda memantau jadwal, informasi jamaah,
            inventaris, donasi, dan keuangan dalam satu pusat kontrol yang lebih
            tertata.
          </p>
          <div className="hero-actions">
            <Link to="/jadwal-salat" className="hero-btn hero-btn-primary">
              Buka Jadwal
            </Link>
            <Link to="/pengumuman" className="hero-btn hero-btn-secondary">
              Kelola Pengumuman
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-mascot-shell">
            <div className="hero-mascot-ring"></div>
            <div className="hero-mascot">
              <FalconMascot size={340} />
            </div>
          </div>
          <div className="hero-panel-top">
            <span className="hero-panel-label">Ringkasan Hari Ini</span>
            <strong>Operasional Masjid</strong>
            <p>
              Semua kebutuhan administrasi masjid terkumpul di satu dashboard
              yang lebih nyaman dipantau.
            </p>
          </div>
          <div className="hero-metrics">
            <div className="hero-metric-card">
              <span className="hero-metric-label">Fokus Utama</span>
              <strong>Jadwal & Petugas</strong>
            </div>
            <div className="hero-metric-card">
              <span className="hero-metric-label">Akses Cepat</span>
              <strong>Pengumuman & Donasi</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Ringkasan Modul</span>
            <h2>Area kerja utama</h2>
            <p>
              Setiap kartu menampilkan fokus modul utama agar admin lebih cepat
              berpindah ke pekerjaan inti.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Link
              to={stat.link}
              key={index}
              className={`stat-card ${stat.color}`}
            >
              <span className="stat-eyebrow">{stat.eyebrow}</span>
              <div className="stat-content">
                <h3>{stat.count}</h3>
                <h4>{stat.label}</h4>
                <p>{stat.description}</p>
              </div>
              <span className="stat-link">Lihat Detail</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="dashboard-bottom-grid">
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <span className="section-kicker">Akses Cepat</span>
              <h2>Aksi yang sering dipakai</h2>
              <p>
                Pintasan ini disusun agar proses kerja harian lebih efisien dan
                tetap terasa rapi.
              </p>
            </div>
          </div>

          <div className="actions-grid">
            {quickActions.map((action) => (
              <Link to={action.link} key={action.title} className="action-btn">
                <strong>{action.title}</strong>
                <p>{action.description}</p>
                <span>{action.linkLabel}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="dashboard-section dashboard-notes">
          <div className="section-header">
            <div>
              <span className="section-kicker">Kualitas Tampilan</span>
              <h2>Prinsip dashboard baru</h2>
              <p>
                Layout ini dibuat lebih bersih agar visualnya terasa premium
                tanpa kehilangan fungsi utamanya.
              </p>
            </div>
          </div>

          <div className="notes-list">
            {highlights.map((item) => (
              <div key={item.title} className="note-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
