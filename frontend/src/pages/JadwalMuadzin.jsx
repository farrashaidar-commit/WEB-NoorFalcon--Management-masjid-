import React, { useState } from "react";
import { useApi } from "../utils/useApi";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import "./PageStyles.css";
import "./Auth.css";

const JadwalMuadzin = () => {
  const { data, loading, error, createData, updateData, deleteData } =
    useApi("jadwal-muadzin");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    hari: "",
    jam: "",
    telepon: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateData(editingItem.id, formData);
    } else {
      await createData(formData);
    }
    setIsModalOpen(false);
    setFormData({ nama: "", hari: "", jam: "", telepon: "" });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const columns = [
    { key: "nama", title: "Nama Muadzin" },
    { key: "hari", title: "Hari" },
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
          <h1>📢 Jadwal Muadzin</h1>
          <p>Jadwal muadzin untuk panggilan sholat</p>
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
          ➕ Tambah Muadzin
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
        title={editingItem ? "Edit Muadzin" : "Tambah Muadzin Baru"}
      >
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nama">Nama Muadzin</label>
            <input
              type="text"
              id="nama"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              placeholder="Masukkan nama muadzin"
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
              placeholder="Contoh: Senin, Rabu, Jumat"
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
              placeholder="Contoh: Subuh, Maghrib"
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
            {editingItem ? "Simpan Perubahan" : "Tambah Muadzin"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default JadwalMuadzin;
