import React, { useState } from "react";
import { useApi } from "../utils/useApi";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import "./PageStyles.css";
import "./Auth.css";

const Inventaris = () => {
  const { data, loading, error, createData, updateData, deleteData } =
    useApi("inventaris");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    jumlah: "",
    kondisi: "",
    lokasi: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateData(editingItem.id, formData);
    } else {
      await createData(formData);
    }
    setIsModalOpen(false);
    setFormData({ nama: "", jumlah: "", kondisi: "", lokasi: "" });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const columns = [
    { key: "nama", title: "Nama Barang" },
    { key: "jumlah", title: "Jumlah" },
    {
      key: "kondisi",
      title: "Kondisi",
      render: (item) => (
        <span
          style={{
            color:
              item.kondisi === "Baik"
                ? "#4caf50"
                : item.kondisi === "Perlu Perawatan"
                  ? "#ff9800"
                  : "#f44336",
            fontWeight: 600,
          }}
        >
          {item.kondisi}
        </span>
      ),
    },
    { key: "lokasi", title: "Lokasi" },
  ];

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
          <h1>📦 Inventaris</h1>
          <p>Daftar barang dan aset masjid</p>
        </div>
        <button
          className="auth-btn"
          style={{ padding: "0.9rem 1.8rem", fontSize: "1rem" }}
          onClick={() => {
            setEditingItem(null);
            setFormData({ nama: "", jumlah: "", kondisi: "", lokasi: "" });
            setIsModalOpen(true);
          }}
        >
          ➕ Tambah Barang
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={deleteData}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Barang" : "Tambah Barang Baru"}
      >
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nama">Nama Barang</label>
            <input
              type="text"
              id="nama"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              placeholder="Masukkan nama barang"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jumlah">Jumlah</label>
            <input
              type="number"
              id="jumlah"
              value={formData.jumlah}
              onChange={(e) =>
                setFormData({ ...formData, jumlah: e.target.value })
              }
              placeholder="Masukkan jumlah"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="kondisi">Kondisi</label>
            <select
              id="kondisi"
              value={formData.kondisi}
              onChange={(e) =>
                setFormData({ ...formData, kondisi: e.target.value })
              }
              required
              style={{
                padding: "1rem 1.25rem",
                border: "2px solid #e8e4df",
                borderRadius: "12px",
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
            >
              <option value="">Pilih kondisi</option>
              <option value="Baik">Baik</option>
              <option value="Perlu Perawatan">Perlu Perawatan</option>
              <option value="Perbaiki">Perbaiki</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lokasi">Lokasi</label>
            <input
              type="text"
              id="lokasi"
              value={formData.lokasi}
              onChange={(e) =>
                setFormData({ ...formData, lokasi: e.target.value })
              }
              placeholder="Masukkan lokasi"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            {editingItem ? "Simpan Perubahan" : "Tambah Barang"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Inventaris;
