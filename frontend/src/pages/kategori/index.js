import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function KategoriIndex() {
    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        axios.get(`${API}/kategori`).then((res) => setKategori(res.data.data));
    }, []);

    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Manajemen Kategori</h1>
                <Link to="/kategori/addproduct" className="btn-create">+ Tambah Kategori</Link>
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
                                <tr key={item.id_kategori}>
                                    <td className="font-medium">{index + 1}</td>
                                    <td>{item.nama_kategori}</td>
                                    <td>
                                        <div className="action-btn-group">
                                            <Link to={`/kategori/editproduct/${item.id_kategori}`}
                                                className="action-btn action-btn-edit">Edit</Link>
                                            <Link to={`/kategori/deleteproduct/${item.id_kategori}`}
                                                className="action-btn action-btn-delete">Hapus</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">
                                    <div className="empty-state">
                                        <div className="empty-state-icon">📁</div>
                                        <div className="empty-state-text">Memuat data kategori...</div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
