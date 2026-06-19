import React, { useState } from "react";
import { useApi } from "../utils/useApi";
import Modal from "../components/Modal";
import "./PageStyles.css";
import "./Auth.css";

const Pengumuman = () => {
  const { data, loading, error, createData, updateData, deleteData } =
    useApi("pengumuman");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    judul: "",
    tanggal: "",
    isi: "",
    penulis: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateData(editingItem.id, formData);
    } else {
      await createData(formData);
    }
    setIsModalOpen(false);
    setFormData({ judul: "", tanggal: "", isi: "", penulis: "" });
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
          <h1>📋 Pengumuman</h1>
          <p>Pengumuman dan informasi terbaru dari masjid</p>
        </div>
        <button
          className="auth-btn"
          style={{ padding: "0.9rem 1.8rem", fontSize: "1rem" }}
          onClick={() => {
            setEditingItem(null);
            setFormData({ judul: "", tanggal: "", isi: "", penulis: "" });
            setIsModalOpen(true);
          }}
        >
          ➕ Tambah Pengumuman
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="card-container">
        {data.map((item) => (
          <div key={item.id} className="card">
            <div className="card-header" style={{ flexWrap: "wrap" }}>
              <h3>{item.judul}</h3>
              <span className="time-badge">{item.tanggal}</span>
            </div>
            <div className="card-body">
              <p
                style={{
                  color: "var(--text)",
                  marginBottom: "1rem",
                  lineHeight: "1.7",
                }}
              >
                {item.isi}
              </p>
              <div className="detail-item">
                <span className="label">Penulis:</span>
                <span className="value">{item.penulis}</span>
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
        title={editingItem ? "Edit Pengumuman" : "Tambah Pengumuman Baru"}
      >
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="judul">Judul</label>
            <input
              type="text"
              id="judul"
              value={formData.judul}
              onChange={(e) =>
                setFormData({ ...formData, judul: e.target.value })
              }
              placeholder="Masukkan judul"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tanggal">Tanggal</label>
            <input
              type="text"
              id="tanggal"
              value={formData.tanggal}
              onChange={(e) =>
                setFormData({ ...formData, tanggal: e.target.value })
              }
              placeholder="Contoh: 18 Juni 2026"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="isi">Isi Pengumuman</label>
            <textarea
              id="isi"
              value={formData.isi}
              onChange={(e) =>
                setFormData({ ...formData, isi: e.target.value })
              }
              placeholder="Masukkan isi pengumuman"
              required
              rows="5"
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "12px",
                border: "2px solid #e8e4df",
                fontSize: "1rem",
                fontFamily: "inherit",
                backgroundColor: "var(--background)",
                color: "var(--text)",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.boxShadow = "0 0 0 5px rgba(201,162,39,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e4df";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="penulis">Penulis</label>
            <input
              type="text"
              id="penulis"
              value={formData.penulis}
              onChange={(e) =>
                setFormData({ ...formData, penulis: e.target.value })
              }
              placeholder="Masukkan nama penulis"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            {editingItem ? "Simpan Perubahan" : "Tambah Pengumuman"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Pengumuman;
