import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function ProdukIndex() {
    const [produk, setProduk] = useState([]);
    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [resProduk, resKategori] = await Promise.all([
                axios.get(`${API}/produk`),
                axios.get(`${API}/kategori`),
            ]);
            setProduk(resProduk.data.data);
            setKategori(resKategori.data.data);
        } catch (err) {
            console.error("Gagal mengambil data:", err);
        }
    };

    const formatRupiah = (num) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    };

    const getNamaKategori = (id) => {
        const kat = kategori.find((k) => k.id_kategori === id);
        return kat ? kat.nama_kategori : "-";
    };

    return (
        <div className="main-container">
            <Nav />
            <div className="header-section">
                <h1>Manajemen Produk</h1>
                <Link to="/produk/addproduct" className="btn-create">+ Tambah Produk</Link>
            </div>

            <div className="table-card">
                <table className="elegant-table">
                    <thead>
                        <tr>
                            <th style={{ width: "60px" }}>No</th>
                            <th>Gambar</th>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th>Stok</th>
                            <th>Kategori</th>
                            <th style={{ textAlign: "right" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produk.length > 0 ? (
                            produk.map((item, index) => (
                                <tr key={item.id_produk}>
                                    <td className="font-medium">{index + 1}</td>
                                    <td>
                                        {item.gambar ? (
                                            <img src={`http://localhost:8000/images/${item.gambar}`} alt={item.nama_produk}
                                                className="product-image" />
                                        ) : (
                                            <span style={{ color: "#94a3b8", fontSize: "12px" }}>-</span>
                                        )}
                                    </td>
                                    <td className="font-medium">{item.nama_produk}</td>
                                    <td>{formatRupiah(item.harga)}</td>
                                    <td>{item.stok}</td>
                                    <td>{getNamaKategori(item.id_kategori)}</td>
                                    <td>
                                        <div className="action-btn-group">
                                            <Link to={`/produk/editproduct/${item.id_produk}`}
                                                className="action-btn action-btn-edit">Edit</Link>
                                            <Link to={`/produk/deleteproduct/${item.id_produk}`}
                                                className="action-btn action-btn-delete">Hapus</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">
                                    <div className="empty-state">
                                        <div className="empty-state-icon">📦</div>
                                        <div className="empty-state-text">Data produk belum tersedia.</div>
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
