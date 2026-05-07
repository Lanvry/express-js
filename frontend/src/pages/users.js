import React from "react";
import Nav from "../components/nav";

export default function Users() {
    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Manajemen Users</h1>
                <a href="#" className="btn-create">+ Tambah User</a>
            </div>

            <div className="table-card">
                <table className="elegant-table">
                    <thead>
                        <tr>
                            <th style={{ width: "80px" }}>No</th>
                            <th>Nama Lengkap</th>
                            <th>Email</th>
                            <th style={{ textAlign: "right" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", color: "#64748b", padding: "40px" }}>Data user belum tersedia.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
