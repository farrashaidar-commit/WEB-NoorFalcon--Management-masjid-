import React, { useState, useMemo } from "react";
import { useApi } from "../utils/useApi";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import "./PageStyles.css";
import "./Auth.css";

const formatRupiah = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

const Donasi = () => {
  const { data, loading, error, createData, updateData, deleteData } =
    useApi("donasi");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    tanggal: "",
    jumlah: "",
    keterangan: "",
  });

  const totalDonasi = useMemo(() => {
    return data.reduce((acc, curr) => acc + Number(curr.jumlah), 0);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateData(editingItem.id, formData);
    } else {
      await createData(formData);
    }
    setIsModalOpen(false);
    setFormData({ nama: "", tanggal: "", jumlah: "", keterangan: "" });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const columns = [
    { key: "nama", title: "Nama Donatur" },
    { key: "tanggal", title: "Tanggal" },
    {
      key: "jumlah",
      title: "Jumlah",
      render: (item) => formatRupiah(item.jumlah),
    },
    { key: "keterangan", title: "Keterangan" },
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
          <h1>🤲 Donasi</h1>
          <p>Catatan donasi dan infaq masjid</p>
        </div>
        <button
          className="auth-btn"
          style={{ padding: "0.9rem 1.8rem", fontSize: "1rem" }}
          onClick={() => {
            setEditingItem(null);
            setFormData({ nama: "", tanggal: "", jumlah: "", keterangan: "" });
            setIsModalOpen(true);
          }}
        >
          ➕ Tambah Donasi
        </button>
      </div>

      <div className="card-container" style={{ marginBottom: "2.5rem" }}>
        <div className="card" style={{ borderLeft: "4px solid var(--accent)" }}>
          <div className="card-header">
            <h3>Total Donasi</h3>
          </div>
          <div className="card-body">
            <h3
              style={{
                color: "var(--primary)",
                fontSize: "2rem",
                fontWeight: 900,
              }}
            >
              {formatRupiah(totalDonasi)}
            </h3>
          </div>
        </div>
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
        title={editingItem ? "Edit Donasi" : "Tambah Donasi Baru"}
      >
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nama">Nama Donatur</label>
            <input
              type="text"
              id="nama"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              placeholder="Masukkan nama"
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
            <label htmlFor="jumlah">Jumlah (tanpa titik/koma)</label>
            <input
              type="number"
              id="jumlah"
              value={formData.jumlah}
              onChange={(e) =>
                setFormData({ ...formData, jumlah: e.target.value })
              }
              placeholder="Contoh: 500000"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="keterangan">Keterangan</label>
            <input
              type="text"
              id="keterangan"
              value={formData.keterangan}
              onChange={(e) =>
                setFormData({ ...formData, keterangan: e.target.value })
              }
              placeholder="Masukkan keterangan"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            {editingItem ? "Simpan Perubahan" : "Tambah Donasi"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Donasi;
