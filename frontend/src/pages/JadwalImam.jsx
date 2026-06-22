import React, { useState } from "react";
import { useApi } from "../utils/useApi";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import "./PageStyles.css";
import "./Auth.css";

const JadwalImam = () => {
  const { data, loading, error, createData, updateData, deleteData } = useApi("jadwal-imam");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ nama: "", hari: "", jam: "", telepon: "", jenis: "Harian", minggu: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateData(editingItem.id, formData);
    } else {
      await createData(formData);
    }
    setIsModalOpen(false);
    setFormData({ nama: "", hari: "", jam: "", telepon: "", jenis: "Harian", minggu: "" });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const columns = [
    { key: "nama", title: "Nama Imam" },
    { key: "hari", title: "Hari" },
    { key: "jenis", title: "Jenis" },
    { key: "minggu", title: "Minggu" },
    { key: "jam", title: "Jam" },
    { key: "telepon", title: "Telepon" },
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
          <h1>👳 Jadwal Imam</h1>
          <p>Jadwal imam untuk sholat berjamaah</p>
        </div>
        <button
          className="auth-btn"
          style={{ padding: "0.9rem 1.8rem", fontSize: "1rem" }}
          onClick={() => {
            setEditingItem(null);
            setFormData({ nama: "", hari: "", jam: "", telepon: "" });
            setIsModalOpen(true);
          }}
        >
          ➕ Tambah Imam
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
        title={editingItem ? "Edit Imam" : "Tambah Imam Baru"}
      >
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nama">Nama Imam</label>
            <input
              type="text"
              id="nama"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              placeholder="Masukkan nama imam"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hari">Hari</label>
            <input
              type="text"
              id="hari"
              value={formData.hari}
              onChange={(e) =>
                setFormData({ ...formData, hari: e.target.value })
              }
              placeholder="Contoh: Senin - Rabu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jam">Jam</label>
            <input
              type="text"
              id="jam"
              value={formData.jam}
              onChange={(e) =>
                setFormData({ ...formData, jam: e.target.value })
              }
              placeholder="Contoh: Semua Waktu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telepon">Telepon</label>
            <input
              type="text"
              id="telepon"
              value={formData.telepon}
              onChange={(e) =>
                setFormData({ ...formData, telepon: e.target.value })
              }
              placeholder="Masukkan nomor telepon"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            {editingItem ? "Simpan Perubahan" : "Tambah Imam"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default JadwalImam;
