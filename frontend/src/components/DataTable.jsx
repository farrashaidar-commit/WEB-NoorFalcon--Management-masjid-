import React from "react";
import "./DataTable.css";

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="data-table-container">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.title}</th>
              ))}
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render ? col.render(item) : item[col.key]}</td>
                ))}
                <td>
                  <div className="table-actions">
                    <button className="btn btn-edit" onClick={() => onEdit(item)}>
                      ✏️
                    </button>
                    <button className="btn btn-delete" onClick={() => onDelete(item.id)}>
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
