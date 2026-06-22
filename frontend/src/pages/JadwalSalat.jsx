import React, { useState } from "react";
import { useApi } from "../utils/useApi";
import Modal from "../components/Modal";
import "./PageStyles.css";
import "./Auth.css";

const JadwalSalat = () => {
  const { data, loading, error, createData, updateData, deleteData } =
    useApi("jadwal-salat");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    waktu: "",
    waktu_jam: "",
    imam: "",
    muadzin: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateData(editingItem.id, formData);
    } else {
      await createData(formData);
    }
    setIsModalOpen(false);
    setFormData({ waktu: "", waktu_jam: "", imam: "", muadzin: "" });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container">
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1>🕌 Jadwal Salat</h1>
          <p>Jadwal salat harian masjid</p>
        </div>
        <button
          className="auth-btn"
          style={{ padding: "0.9rem 1.8rem", fontSize: "1rem" }}
          onClick={() => {
            setEditingItem(null);
            setFormData({ waktu: "", waktu_jam: "", imam: "", muadzin: "" });
            setIsModalOpen(true);
          }}
        >
          ➕ Tambah Jadwal
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="card-container">
        {data.map((item) => (
          <div key={item.id} className="card">
            <div className="card-header" style={{ flexWrap: "wrap" }}>
              <h3>{item.waktu}</h3>
              <span className="time-badge">{item.waktu_jam}</span>
            </div>
            <div className="card-body">
              <div className="detail-item">
                <span className="label">Imam:</span>
                <span className="value">{item.imam}</span>
              </div>
              <div className="detail-item">
                <span className="label">Muadzin:</span>
                <span className="value">{item.muadzin}</span>
              </div>
              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}
              >
                <button
                  className="btn btn-edit"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                  onClick={() => handleEdit(item)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-delete"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                  onClick={() => deleteData(item.id)}
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Jadwal" : "Tambah Jadwal Baru"}
      >
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="waktu">Waktu Salat</label>
            <input
              type="text"
              id="waktu"
              value={formData.waktu}
              onChange={(e) =>
                setFormData({ ...formData, waktu: e.target.value })
              }
              placeholder="Contoh: Subuh"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="waktu_jam">Jam</label>
            <input
              type="text"
              id="waktu_jam"
              value={formData.waktu_jam}
              onChange={(e) =>
                setFormData({ ...formData, waktu_jam: e.target.value })
              }
              placeholder="Contoh: 04:30"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imam">Imam</label>
            <input
              type="text"
              id="imam"
              value={formData.imam}
              onChange={(e) =>
                setFormData({ ...formData, imam: e.target.value })
              }
              placeholder="Masukkan nama imam"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="muadzin">Muadzin</label>
            <input
              type="text"
              id="muadzin"
              value={formData.muadzin}
              onChange={(e) =>
                setFormData({ ...formData, muadzin: e.target.value })
              }
              placeholder="Masukkan nama muadzin"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            {editingItem ? "Simpan Perubahan" : "Tambah Jadwal"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default JadwalSalat;
