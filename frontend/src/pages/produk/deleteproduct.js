import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function ProdukDelete() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [produk, setProduk] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return navigate("/login");
        axios.get(`${API}/produk/${id}`).then((res) => {
            setProduk(res.data.data);
        }).catch(() => navigate("/produk"));
    }, [token, navigate, id]);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.get(`${API}/produk/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/produk");
        } catch (err) {
            console.error("Gagal menghapus produk:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!produk) return null;

    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Hapus Produk</h1>
                <Link to="/produk" className="btn-secondary">Kembali</Link>
            </div>

            <div className="table-card" style={{ textAlign: "center", padding: "60px 40px", maxWidth: "500px", margin: "0 auto" }}>
                <div className="delete-icon">!</div>
                <h2 style={{ margin: "0 0 8px", color: "#0f172a" }}>Yakin ingin menghapus produk ini?</h2>
                <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "14px" }}>
                    "{produk.nama_produk}" akan dihapus secara permanen.
                </p>
                {produk.gambar && (
                    <img src={`http://localhost:8000/images/${produk.gambar}`} alt={produk.nama_produk}
                        className="product-image-lg" style={{ marginBottom: "24px" }} />
                )}
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                    <Link to="/produk" className="btn-secondary">Batal</Link>
                    <button onClick={handleDelete} disabled={loading} className="btn-danger">
                        {loading ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
