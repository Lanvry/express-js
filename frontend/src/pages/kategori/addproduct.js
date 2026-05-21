import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function KategoriAdd() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [nama, setNama] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${API}/kategori/store`,
                { nama_kategori: nama },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate("/kategori");
        } catch (err) {
            console.error("Gagal menyimpan kategori:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Tambah Kategori</h1>
                <Link to="/kategori" className="btn-secondary">Kembali</Link>
            </div>

            <div className="table-card" style={{ maxWidth: "480px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama Kategori</label>
                        <input type="text" required value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="form-control" placeholder="Masukkan nama kategori" />
                    </div>

                    <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                        <Link to="/kategori" className="btn-secondary">Batal</Link>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
