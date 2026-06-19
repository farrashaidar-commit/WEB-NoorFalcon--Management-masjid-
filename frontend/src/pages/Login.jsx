import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FalconMascot from "../components/FalconMascot";
import "./Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("noorfalcon_users") || "[]");
    const user = users.find(
      (u) => (u.username === username || u.email === username) && u.password === password
    );

    if (user) {
      localStorage.setItem("noorfalcon_currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Username/Email atau password salah!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <FalconMascot size={200} />
          <h1 className="auth-welcome">Selamat Datang Kembali!</h1>
          <p className="auth-subtitle">
            Kelola masjid Anda dengan mudah bersama NoorFalcon
          </p>
        </div>
        <div className="auth-right">
          <h2 className="auth-title">Masuk</h2>
          <p className="auth-desc">Silakan masuk ke akun Anda</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username / Email</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username atau email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              Masuk
            </button>
          </form>

          <p className="auth-switch">
            Belum punya akun? <Link to="/register">Daftar Sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
