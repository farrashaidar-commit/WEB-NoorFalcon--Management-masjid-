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

const Keuangan = () => {
  const { data, loading, error, createData, updateData, deleteData } =
    useApi("keuangan");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    tanggal: "",
    keterangan: "",
    jenis: "Pemasukan",
    jumlah: "",
  });

  const { totalPemasukan, totalPengeluaran, saldo } = useMemo(() => {
    let masuk = 0;
    let keluar = 0;
    data.forEach((item) => {
      if (item.jenis === "Pemasukan") masuk += Number(item.jumlah);
      else keluar += Number(item.jumlah);
    });
    return {
      totalPemasukan: masuk,
      totalPengeluaran: keluar,
      saldo: masuk - keluar,
    };
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateData(editingItem.id, formData);
    } else {
      await createData(formData);
    }
    setIsModalOpen(false);
    setFormData({
      tanggal: "",
      keterangan: "",
      jenis: "Pemasukan",
      jumlah: "",
    });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const columns = [
    { key: "tanggal", title: "Tanggal" },
    { key: "keterangan", title: "Keterangan" },
    {
      key: "jenis",
      title: "Jenis",
      render: (item) => (
        <span
          style={{
            color: item.jenis === "Pemasukan" ? "#4caf50" : "#f44336",
            fontWeight: 600,
          }}
        >
          {item.jenis}
        </span>
      ),
    },
    {
      key: "jumlah",
      title: "Jumlah",
      render: (item) => formatRupiah(item.jumlah),
    },
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
          <h1>💰 Keuangan</h1>
          <p>Laporan keuangan masjid</p>
        </div>
        <button
          className="auth-btn"
          style={{ padding: "0.9rem 1.8rem", fontSize: "1rem" }}
          onClick={() => {
            setEditingItem(null);
            setFormData({
              tanggal: "",
              keterangan: "",
              jenis: "Pemasukan",
              jumlah: "",
            });
            setIsModalOpen(true);
          }}
        >
          ➕ Tambah Transaksi
        </button>
      </div>

      <div className="card-container" style={{ marginBottom: "2.5rem" }}>
        <div className="card" style={{ borderLeft: "4px solid #4caf50" }}>
          <div className="card-header">
            <h3>Total Pemasukan</h3>
          </div>
          <div className="card-body">
            <h3 style={{ color: "#4caf50", fontSize: "2rem", fontWeight: 900 }}>
              {formatRupiah(totalPemasukan)}
            </h3>
          </div>
        </div>
        <div className="card" style={{ borderLeft: "4px solid #f44336" }}>
          <div className="card-header">
            <h3>Total Pengeluaran</h3>
          </div>
          <div className="card-body">
            <h3 style={{ color: "#f44336", fontSize: "2rem", fontWeight: 900 }}>
              {formatRupiah(totalPengeluaran)}
            </h3>
          </div>
        </div>
        <div className="card" style={{ borderLeft: "4px solid var(--accent)" }}>
          <div className="card-header">
            <h3>Saldo</h3>
          </div>
          <div className="card-body">
            <h3
              style={{
                color: "var(--primary)",
                fontSize: "2rem",
                fontWeight: 900,
              }}
            >
              {formatRupiah(saldo)}
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
        title={editingItem ? "Edit Transaksi" : "Tambah Transaksi Baru"}
      >
        <form onSubmit={handleSubmit} className="auth-form">
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
          <div className="form-group">
            <label htmlFor="jenis">Jenis</label>
            <select
              id="jenis"
              value={formData.jenis}
              onChange={(e) =>
                setFormData({ ...formData, jenis: e.target.value })
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
              <option value="Pemasukan">Pemasukan</option>
              <option value="Pengeluaran">Pengeluaran</option>
            </select>
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
              placeholder="Contoh: 2500000"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            {editingItem ? "Simpan Perubahan" : "Tambah Transaksi"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Keuangan;
