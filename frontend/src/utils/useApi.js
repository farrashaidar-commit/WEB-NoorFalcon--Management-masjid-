import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api";

export const useApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/${endpoint}`);
      const result = await res.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createData = async (newItem) => {
    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const result = await res.json();
      setData([...data, result]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateData = async (id, updatedItem) => {
    try {
      const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      const result = await res.json();
      setData(data.map((item) => (item.id === id ? result : item)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteData = async (id) => {
    try {
      await fetch(`${API_BASE}/${endpoint}/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, fetchData, createData, updateData, deleteData };
};
