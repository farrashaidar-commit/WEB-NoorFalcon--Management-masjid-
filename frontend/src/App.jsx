import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import JadwalSalat from "./pages/JadwalSalat";
import JadwalImam from "./pages/JadwalImam";
import JadwalMuadzin from "./pages/JadwalMuadzin";
import Pengumuman from "./pages/Pengumuman";
import Inventaris from "./pages/Inventaris";
import Keuangan from "./pages/Keuangan";
import Donasi from "./pages/Donasi";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/App.css";

function ProtectedRoute({ children }) {
  const currentUser = localStorage.getItem("noorfalcon_currentUser");
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const currentUser = localStorage.getItem("noorfalcon_currentUser");
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/jadwal-salat" element={<JadwalSalat />} />
                      <Route path="/jadwal-imam" element={<JadwalImam />} />
                      <Route
                        path="/jadwal-muadzin"
                        element={<JadwalMuadzin />}
                      />
                      <Route path="/pengumuman" element={<Pengumuman />} />
                      <Route path="/inventaris" element={<Inventaris />} />
                      <Route path="/keuangan" element={<Keuangan />} />
                      <Route path="/donasi" element={<Donasi />} />
                    </Routes>
                  </main>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
