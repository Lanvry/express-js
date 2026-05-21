import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await axios.post("http://localhost:8000/api/register", {
                email,
                password,
            });
            setSuccess("Registrasi berhasil! Mengalihkan ke login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Registrasi gagal");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #fdf2f8 100%)",
            padding: "20px"
        }}>
            <div style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(16px)",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(79,70,229,0.08)",
                width: "100%",
                maxWidth: "400px",
                border: "1px solid rgba(226,232,240,0.7)"
            }}>
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{
                        width: "56px", height: "56px", borderRadius: "14px",
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 16px", fontSize: "24px", color: "white", fontWeight: 800
                    }}>A</div>
                    <h1 style={{ fontSize: "24px", margin: 0 }}>Buat Akun</h1>
                    <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>Daftar untuk memulai</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" placeholder="Masukkan email" required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control" placeholder="Masukkan password" required />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                        Register
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#64748b" }}>
                    Sudah punya akun? <Link to="/login" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: 600 }}>Login</Link>
                </p>
            </div>
        </div>
    );
}
