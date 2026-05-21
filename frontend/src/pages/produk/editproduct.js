import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function ProdukEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [kategori, setKategori] = useState([]);
    const [form, setForm] = useState({ nama_produk: "", harga: "", stok: "", id_kategori: "" });
    const [gambar, setGambar] = useState(null);
    const [gambarLama, setGambarLama] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return navigate("/login");
        fetchData();
    }, [token, navigate, id]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async () => {
        try {
            const [resProduk, resKategori] = await Promise.all([
                axios.get(`${API}/produk/${id}`),
                axios.get(`${API}/kategori`),
            ]);
            const item = resProduk.data.data;
            setForm({
                nama_produk: item.nama_produk,
                harga: item.harga,
                stok: item.stok,
                id_kategori: item.id_kategori,
            });
            setGambarLama(item.gambar || "");
            setKategori(resKategori.data.data);
        } catch (err) {
            console.error("Gagal mengambil data:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("nama_produk", form.nama_produk);
        formData.append("harga", form.harga);
        formData.append("stok", form.stok);
        formData.append("kategori", form.id_kategori);
        if (gambar) formData.append("gambar", gambar);

        try {
            await axios.post(`${API}/produk/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/produk");
        } catch (err) {
            console.error("Gagal mengupdate produk:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Edit Produk</h1>
                <Link to="/produk" className="btn-secondary">Kembali</Link>
            </div>

            <div className="table-card" style={{ maxWidth: "560px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama Produk</label>
                        <input type="text" required value={form.nama_produk}
                            onChange={(e) => setForm({ ...form, nama_produk: e.target.value })}
                            className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Harga</label>
                        <input type="number" required value={form.harga}
                            onChange={(e) => setForm({ ...form, harga: e.target.value })}
                            className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Stok</label>
                        <input type="number" required value={form.stok}
                            onChange={(e) => setForm({ ...form, stok: e.target.value })}
                            className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Kategori</label>
                        <select required value={form.id_kategori}
                            onChange={(e) => setForm({ ...form, id_kategori: e.target.value })}
                            className="form-control">
                            <option value="">Pilih Kategori</option>
                            {kategori.map((k) => (
                                <option key={k.id_kategori} value={k.id_kategori}>{k.nama_kategori}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Gambar</label>
                        {gambarLama && (
                            <div style={{ marginBottom: "10px" }}>
                                <img src={`http://localhost:8000/images/${gambarLama}`} alt="Current"
                                    className="product-image-lg" />
                                <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0" }}>Gambar saat ini</p>
                            </div>
                        )}
                        <input type="file" accept="image/*"
                            onChange={(e) => setGambar(e.target.files[0])}
                            className="form-control" />
                        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>Biarkan kosong jika tidak ingin mengubah gambar</p>
                    </div>

                    <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                        <Link to="/produk" className="btn-secondary">Batal</Link>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
