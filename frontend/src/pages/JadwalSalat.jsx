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
          onClick={() =