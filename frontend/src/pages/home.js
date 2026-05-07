import React from "react";
import Nav from "../components/nav";

export default function Home() {
    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <div>
                    <h1>Dashboard Admin</h1>
                    <p style={{ color: "#64748b", marginTop: "8px" }}>Selamat datang kembali di panel kontrol inventaris.</p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "20px" }}>
                <div className="table-card" style={{ textAlign: "center", padding: "40px" }}>
                    <div style={{ fontSize: "40px", marginBottom: "15px" }}>📁</div>
                    <h3 style={{ margin: "0 0 10px 0" }}>Kategori</h3>
                    <p style={{ color: "#64748b", fontSize: "14px" }}>Kelola semua kategori produk Anda.</p>
                </div>
                <div className="table-card" style={{ textAlign: "center", padding: "40px" }}>
                    <div style={{ fontSize: "40px", marginBottom: "15px" }}>🛒</div>
                    <h3 style={{ margin: "0 0 10px 0" }}>Produk</h3>
                    <p style={{ color: "#64748b", fontSize: "14px" }}>Pantau stok dan informasi produk.</p>
                </div>
                <div className="table-card" style={{ textAlign: "center", padding: "40px" }}>
                    <div style={{ fontSize: "40px", marginBottom: "15px" }}>👥</div>
                    <h3 style={{ margin: "0 0 10px 0" }}>Users</h3>
                    <p style={{ color: "#64748b", fontSize: "14px" }}>Manajemen pengguna sistem.</p>
                </div>
            </div>
        </div>
    );
}