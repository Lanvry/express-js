import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Users from "./pages/users";
import Produk from "./pages/produk";
import Kategori from "./pages/kategori";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/kategori" element={<Kategori />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
