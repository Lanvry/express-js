import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Users from "./pages/users";
import ProdukIndex from "./pages/produk/index";
import ProdukAdd from "./pages/produk/addproduct";
import ProdukEdit from "./pages/produk/editproduct";
import ProdukDelete from "./pages/produk/deleteproduct";
import KategoriIndex from "./pages/kategori/index";
import KategoriAdd from "./pages/kategori/addproduct";
import KategoriEdit from "./pages/kategori/editproduct";
import KategoriDelete from "./pages/kategori/deleteproduct";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/produk" element={<ProdukIndex />} />
        <Route path="/produk/addproduct" element={<ProdukAdd />} />
        <Route path="/produk/editproduct/:id" element={<ProdukEdit />} />
        <Route path="/produk/deleteproduct/:id" element={<ProdukDelete />} />
        <Route path="/kategori" element={<KategoriIndex />} />
        <Route path="/kategori/addproduct" element={<KategoriAdd />} />
        <Route path="/kategori/editproduct/:id" element={<KategoriEdit />} />
        <Route path="/kategori/deleteproduct/:id" element={<KategoriDelete />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
