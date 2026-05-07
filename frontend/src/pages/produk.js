import React from "react";
import Nav from "../components/nav";

export default function Produk() {
    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Manajemen Produk</h1>
                <a href="#" className="btn-create">+ Tambah Produk</a>
            </div>

            <div className="table-card">
                <table className="elegant-table">
                    <thead>
                        <tr>
                            <th style={{ width: "80px" }}>No</th>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th style={{ textAlign: "right" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", color: "#64748b", padding: "40px" }}>Data produk belum tersedia.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}