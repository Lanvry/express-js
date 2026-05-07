import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import axios from "axios";

export default function Kategori() {
    const [kategori, SetKategori] = useState([]);

    useEffect(() => {
        axios.get("https://8f03-103-24-58-33.ngrok-free.app/api/kategori", {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            }
        }).then((response) => {
            console.log(response.data.data);
            SetKategori(response.data.data);
        });
    }, []);

    console.log(kategori);

    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Manajemen Kategori</h1>
                <a href="#" className="btn-create">+ Tambah Kategori</a>
            </div>

            <div className="table-card">
                <table className="elegant-table">
                    <thead>
                        <tr>
                            <th style={{ width: "80px" }}>No</th>
                            <th>Nama Kategori</th>
                            <th style={{ textAlign: "right" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kategori.length > 0 ? (
                            kategori.map((item, index) => (
                                <tr key={index}>
                                    <td className="font-medium">{index + 1}</td>
                                    <td>{item.nama_kategori}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                            <button style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #dbeafe", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>Edit</button>
                                            <button style={{ background: "#fff1f2", color: "#e11d48", border: "1px solid #ffe4e6", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center", color: "#64748b", padding: "40px" }}>Memuat data kategori...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}