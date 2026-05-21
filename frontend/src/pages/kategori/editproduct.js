import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function KategoriEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [nama, setNama] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return navigate("/login");
        axios.get(`${API}/kategori/edit/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            setNama(res.data.data.nama_kategori);
        }).catch((err) => {
            console.error("Gagal mengambil data kategori:", err);
        });
    }, [token, navigate, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${API}/kategori/update/${id}`,
                { nama_kategori: nama },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate("/kategori");
        } catch (err) {
            console.error("Gagal mengupdate kategori:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Edit Kategori</h1>
                <Link to="/kategori" className="btn-secondary">Kembali</Link>
            </div>

            <div className="table-card" style={{ maxWidth: "480px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama Kategori</label>
                        <input type="text" required value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="form-control" />
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
