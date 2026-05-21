import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function KategoriDelete() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [kategori, setKategori] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return navigate("/login");
        axios.get(`${API}/kategori/edit/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            setKategori(res.data.data);
        }).catch(() => navigate("/kategori"));
    }, [token, navigate, id]);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.get(`${API}/kategori/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/kategori");
        } catch (err) {
            console.error("Gagal menghapus kategori:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!kategori) return null;

    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Hapus Kategori</h1>
                <Link to="/kategori" className="btn-secondary">Kembali</Link>
            </div>

            <div className="table-card" style={{ textAlign: "center", padding: "60px 40px", maxWidth: "480px", margin: "0 auto" }}>
                <div className="delete-icon">!</div>
                <h2 style={{ margin: "0 0 8px", color: "#0f172a" }}>Yakin ingin menghapus kategori ini?</h2>
                <p style={{ color: "#64748b", margin: "0 0 32px", fontSize: "14px" }}>
                    "{kategori.nama_kategori}" akan dihapus secara permanen.
                </p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                    <Link to="/kategori" className="btn-secondary">Batal</Link>
                    <button onClick={handleDelete} disabled={loading} className="btn-danger">
                        {loading ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
