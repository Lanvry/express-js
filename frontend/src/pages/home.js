import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/nav";

export default function Home() {
    return (
        <div className="main-container">
            <Nav />

            <div className="welcome-section">
                <div className="header-section" style={{ marginBottom: 0 }}>
                    <div>
                        <h1 className="welcome-title">Dashboard Admin</h1>
                        <p className="welcome-subtitle">Selamat datang kembali di panel kontrol inventaris</p>
                    </div>
                </div>
            </div>

            <div className="stats-grid">
                <Link to="/kategori" style={{ textDecoration: "none" }}>
                    <div className="stat-card">
                        <div className="stat-icon stat-icon-purple">📁</div>
                        <div className="stat-value">Kategori</div>
                        <div className="stat-label">Kelola kategori produk</div>
                    </div>
                </Link>
                <Link to="/produk" style={{ textDecoration: "none" }}>
                    <div className="stat-card">
                        <div className="stat-icon stat-icon-blue">🛒</div>
                        <div className="stat-value">Produk</div>
                        <div className="stat-label">Pantau stok & informasi produk</div>
                    </div>
                </Link>
                <Link to="/users" style={{ textDecoration: "none" }}>
                    <div className="stat-card">
                        <div className="stat-icon stat-icon-pink">👥</div>
                        <div className="stat-value">Users</div>
                        <div className="stat-label">Manajemen pengguna sistem</div>
                    </div>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <div className="stat-card">
                        <div className="stat-icon stat-icon-green">🔐</div>
                        <div className="stat-value">Login</div>
                        <div className="stat-label">Autentikasi & keamanan</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
