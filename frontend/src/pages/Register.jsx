import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FalconMascot from "../components/FalconMascot";
import "./Auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("noorfalcon_users") || "[]");

    const existingUser = users.find((u) => u.username === username || u.email === email);
    if (existingUser) {
      setError("Username atau email sudah terdaftar!");
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("noorfalcon_users", JSON.stringify(users));
    setSuccess("Pendaftaran berhasil! Silakan masuk.");
    
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <FalconMascot size={200} />
          <h1 className="auth-welcome">Bergabunglah Bersama Kami!</h1>
          <p className="auth-subtitle">
            Mulai kelola masjid Anda dengan NoorFalcon
          </p>
        </div>
        <div className="auth-right">
          <h2 className="auth-title">Daftar</h2>
          <p className="auth-desc">Buat akun baru Anda</p>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="reg-username">Username</label>
              <input
                type="text"
                id="reg-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                type="email"
                id="reg-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                type="password"
                id="reg-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm">Konfirmasi Password</label>
              <input
                type="password"
                id="reg-confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi password"
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              Daftar
            </button>
          </form>

          <p className="auth-switch">
            Sudah punya akun? <Link to="/login">Masuk Sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
