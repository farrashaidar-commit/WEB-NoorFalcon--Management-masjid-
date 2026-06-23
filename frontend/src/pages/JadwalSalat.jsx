import React, { useMemo, useState } from "react";
import { useApi } from "../utils/useApi";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import "./PageStyles.css";
import "./Auth.css";

const emptySalatForm = {
  waktu: "",
  waktu_jam: "",
  imam: "",
  muadzin: "",
};

const emptyOfficerForm = {
  nama: "",
  hari: "",
  jam: "",
  telepon: "",
  jenis: "Harian",
  minggu: "",
};

const JadwalSalat = () => {
  const salatApi = useApi("jadwal-salat");
  const imamApi = useApi("jadwal-imam");
  const muadzinApi = useApi("jadwal-muadzin");

  const [activeModal, setActiveModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [salatForm, setSalatForm] = useState(emptySalatForm);
  const [imamForm, setImamForm] = useState(emptyOfficerForm);
  const [muadzinForm, setMuadzinForm] = useState(emptyOfficerForm);

  const isLoading =
    salatApi.loading || imamApi.loading || muadzinApi.loading;
  const combinedError =
    salatApi.error || imamApi.error || muadzinApi.error || null;

  const imamColumns = useMemo(
    () => [
      { key: "nama", title: "Nama Imam" },
      { key: "hari", title: "Hari" },
      { key: "jenis", title: "Jenis" },
      {
        key: "minggu",
        title: "Minggu",
        render: (item) => item.minggu || "-",
      },
      { key: "jam", title: "Jam" },
      { key: "telepon", title: "Telepon" },
    ],
    []
  );

  const muadzinColumns = useMemo(
    () => [
      { key: "nama", title: "Nama Muadzin" },
      { key: "hari", title: "Hari" },
      { key: "jam", title: "Jam" },
      { key: "telepon", title: "Telepon" },
    ],
    []
  );

  const closeModal = () => {
    setActiveModal(null);
    setEditingItem(null);
  };

  const openSalatModal = (item = null) => {
    setEditingItem(item);
    setSalatForm(
      item
        ? {
            waktu: item.waktu || "",
            waktu_jam: item.waktu_jam || "",
            imam: item.imam || "",
            muadzin: item.muadzin || "",
          }
        : emptySalatForm
    );
    setActiveModal("salat");
  };

  const openImamModal = (item = null) => {
    setEditingItem(item);
    setImamForm(
      item
        ? {
            nama: item.nama || "",
            hari: item.hari || "",
            jam: item.jam || "",
            telepon: item.telepon || "",
            jenis: item.jenis || "Harian",
            minggu: item.minggu || "",
          }
        : emptyOfficerForm
    );
    setActiveModal("imam");
  };

  const openMuadzinModal = (item = null) => {
    setEditingItem(item);
    setMuadzinForm(
      item
        ? {
            nama: item.nama || "",
            hari: item.hari || "",
            jam: item.jam || "",
            telepon: item.telepon || "",
            jenis: item.jenis || "Harian",
            minggu: item.minggu || "",
          }
        : emptyOfficerForm
    );
    setActiveModal("muadzin");
  };

  const handleSalatSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await salatApi.updateData(editingItem.id, salatForm);
    } else {
      await salatApi.createData(salatForm);
    }
    closeModal();
    setSalatForm(emptySalatForm);
  };

  const handleImamSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await imamApi.updateData(editingItem.id, imamForm);
    } else {
      await imamApi.createData(imamForm);
    }
    closeModal();
    setImamForm(emptyOfficerForm);
  };

  const handleMuadzinSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await muadzinApi.updateData(editingItem.id, muadzinForm);
    } else {
      await muadzinApi.createData(muadzinForm);
    }
    closeModal();
    setMuadzinForm(emptyOfficerForm);
  };

  return (
    <div className="page-container">
      <div className="page-header schedule-header">
        <div>
          <h1>Jadwal Terpadu</h1>
          <p>
            Seluruh jadwal salat, petugas imam, dan muadzin disusun dalam satu
            tampilan yang rapi agar lebih mudah dipantau.
          </p>
        </div>
      </div>

      <div className="schedule-summary-grid">
        <div className="schedule-summary-card">
          <span className="schedule-summary-label">Jadwal Salat</span>
          <strong>{salatApi.data.length}</strong>
          <p>Waktu salat harian yang aktif</p>
        </div>
        <div className="schedule-summary-card">
          <span className="schedule-summary-label">Petugas Imam</span>
          <strong>{imamApi.data.length}</strong>
          <p>Data imam tersusun per hari dan jenis jadwal</p>
        </div>
        <div className="schedule-summary-card">
          <span className="schedule-summary-label">Petugas Muadzin</span>
          <strong>{muadzinApi.data.length}</strong>
          <p>Daftar muadzin siap pakai untuk tiap waktu</p>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {combinedError && <p>Error: {combinedError}</p>}

      <section className="schedule-panel">
        <div className="section-heading">
          <div>
            <h2>Jadwal Salat Harian</h2>
            <p>Ringkasan waktu salat lengkap dengan imam dan muadzin.</p>
          </div>
          <button className="auth-btn section-action-btn" onClick={() => openSalatModal()}>
            Tambah Jadwal Salat
          </button>
        </div>

        <div className="card-container">
          {salatApi.data.map((item) => (
            <div key={item.id} className="card">
              <div className="card-header" style={{ flexWrap: "wrap" }}>
                <h3>{item.waktu}</h3>
                <span className="time-badge">{item.waktu_jam}</span>
              </div>
              <div className="card-body">
                <div className="detail-item">
                  <span className="label">Imam</span>
                  <span className="value">{item.imam}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Muadzin</span>
                  <span className="value">{item.muadzin}</span>
                </div>
                <div className="section-inline-actions">
                  <button
                    className="btn btn-edit section-small-btn"
                    onClick={() => openSalatModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete section-small-btn"
                    onClick={() => salatApi.deleteData(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="schedule-dual-grid">
        <section className="schedule-panel">
          <div className="section-heading">
            <div>
              <h2>Jadwal Imam</h2>
              <p>Petugas imam untuk shalat berjamaah dan jadwal berkala.</p>
            </div>
            <button className="auth-btn section-action-btn" onClick={() => openImamModal()}>
              Tambah Imam
            </button>
          </div>

          <DataTable
            columns={imamColumns}
            data={imamApi.data}
            onEdit={openImamModal}
            onDelete={imamApi.deleteData}
          />
        </section>

        <section className="schedule-panel">
          <div className="section-heading">
            <div>
              <h2>Jadwal Muadzin</h2>
              <p>Petugas muadzin disusun agar rotasi dan penugasan tetap jelas.</p>
            </div>
            <button
              className="auth-btn section-action-btn"
              onClick={() => openMuadzinModal()}
            >
              Tambah Muadzin
            </button>
          </div>

          <DataTable
            columns={muadzinColumns}
            data={muadzinApi.data}
            onEdit={openMuadzinModal}
            onDelete={muadzinApi.deleteData}
          />
        </section>
      </div>

      <Modal
        isOpen={activeModal === "salat"}
        onClose={closeModal}
        title={editingItem ? "Edit Jadwal Salat" : "Tambah Jadwal Salat"}
      >
        <form onSubmit={handleSalatSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="waktu">Waktu Salat</label>
            <input
              type="text"
              id="waktu"
              value={salatForm.waktu}
              onChange={(e) =>
                setSalatForm({ ...salatForm, waktu: e.target.value })
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
              value={salatForm.waktu_jam}
              onChange={(e) =>
                setSalatForm({ ...salatForm, waktu_jam: e.target.value })
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
              value={salatForm.imam}
              onChange={(e) =>
                setSalatForm({ ...salatForm, imam: e.target.value })
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
              value={salatForm.muadzin}
              onChange={(e) =>
                setSalatForm({ ...salatForm, muadzin: e.target.value })
              }
              placeholder="Masukkan nama muadzin"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            {editingItem ? "Simpan Perubahan" : "Tambah Jadwal Salat"}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={activeModal === "imam"}
        onClose={closeModal}
        title={editingItem ? "Edit Jadwal Imam" : "Tambah Jadwal Imam"}
      >
        <form onSubmit={handleImamSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="imam_nama">Nama Imam</label>
            <input
              type="text"
              id="imam_nama"
              value={imamForm.nama}
              onChange={(e) =>
                setImamForm({ ...imamForm, nama: e.target.value })
              }
              placeholder="Masukkan nama imam"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imam_hari">Hari</label>
            <input
              type="text"
              id="imam_hari"
              value={imamForm.hari}
              onChange={(e) =>
                setImamForm({ ...imamForm, hari: e.target.value })
              }
              placeholder="Contoh: Senin - Rabu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imam_jenis">Jenis Jadwal</label>
            <select
              id="imam_jenis"
              value={imamForm.jenis}
              onChange={(e) =>
                setImamForm({ ...imamForm, jenis: e.target.value })
              }
            >
              <option value="Harian">Harian</option>
              <option value="Mingguan">Mingguan</option>
              <option value="Cadangan">Cadangan</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imam_minggu">Minggu Ke-</label>
            <input
              type="text"
              id="imam_minggu"
              value={imamForm.minggu}
              onChange={(e) =>
                setImamForm({ ...imamForm, minggu: e.target.value })
              }
              placeholder="Opsional, contoh: Minggu 1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="imam_jam">Jam</label>
            <input
              type="text"
              id="imam_jam"
              value={imamForm.jam}
              onChange={(e) =>
                setImamForm({ ...imamForm, jam: e.target.value })
              }
              placeholder="Contoh: Semua Waktu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imam_telepon">Telepon</label>
            <input
              type="text"
              id="imam_telepon"
              value={imamForm.telepon}
              onChange={(e) =>
                setImamForm({ ...imamForm, telepon: e.target.value })
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

      <Modal
        isOpen={activeModal === "muadzin"}
        onClose={closeModal}
        title={editingItem ? "Edit Jadwal Muadzin" : "Tambah Jadwal Muadzin"}
      >
        <form onSubmit={handleMuadzinSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="muadzin_nama">Nama Muadzin</label>
            <input
              type="text"
              id="muadzin_nama"
              value={muadzinForm.nama}
              onChange={(e) =>
                setMuadzinForm({ ...muadzinForm, nama: e.target.value })
              }
              placeholder="Masukkan nama muadzin"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="muadzin_hari">Hari</label>
            <input
              type="text"
              id="muadzin_hari"
              value={muadzinForm.hari}
              onChange={(e) =>
                setMuadzinForm({ ...muadzinForm, hari: e.target.value })
              }
              placeholder="Contoh: Senin, Rabu, Jumat"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="muadzin_jam">Jam</label>
            <input
              type="text"
              id="muadzin_jam"
              value={muadzinForm.jam}
              onChange={(e) =>
                setMuadzinForm({ ...muadzinForm, jam: e.target.value })
              }
              placeholder="Contoh: Subuh, Maghrib"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="muadzin_telepon">Telepon</label>
            <input
              type="text"
              id="muadzin_telepon"
              value={muadzinForm.telepon}
              onChange={(e) =>
                setMuadzinForm({ ...muadzinForm, telepon: e.target.value })
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

export default JadwalSalat;
