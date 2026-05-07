import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="nav-container">
            <div style={{ fontWeight: "700", fontSize: "18px", color: "#2563eb", marginRight: "20px" }}>ADMIN PANEL</div>
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
            <NavLink to="/users" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Users</NavLink>
            <NavLink to="/produk" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Produk</NavLink>
            <NavLink to="/kategori" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Kategori</NavLink>
        </nav>
    );
};

export default Nav;