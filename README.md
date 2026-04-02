# Admin Dashboard - Manajemen Inventaris

Aplikasi web berbasis Node.js dan Express.js untuk mengelola inventaris toko yang meliputi data **Kategori** dan **Produk**. Aplikasi ini dirancang menggunakan arsitektur MVC (Model-View-Controller) dengan antarmuka yang bersih dan modular.

## 🚀 Fitur Utama

- **CRUD Kategori**: Tambah, Edit, Hapus, dan Tampilkan kategori produk.
- **CRUD Produk**: Tambah, Edit, Hapus, dan Tampilkan data produk lengkap dengan integrasi relasi ke tabel Kategori.
- **Notifikasi Pintar**: Menggunakan `express-flash` untuk memberikan *feedback* sukses atau gagal saat melakukan aksi penambahan/perubahan/penghapusan data.
- **DataTables Terintegrasi**: Pencarian, pengurutan, dan paginasi data otomatis menggunakan jQuery DataTables untuk tabel data yang panjang.
- **Tampilan Dinamis & Modular**: Menggunakan template engine **EJS** dengan sistem partials (header, navigasi, message, dan footer terpisah) untuk menghindari pengulangan kode.

## 🛠️ Stack Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript templates), HTML5, CSS3, jQuery
- **Database**: MySQL (via package `mysql`)
- **Plugin Tambahan**:
  - `express-session` & `express-flash`: Manajemen Session dan notifikasi interaktif.
  - `nodemon`: Fitur auto-restart backend saat development.
  - `DataTables`: Sortir dan Cari tabel bawaan di *client-side*.

## 📂 Struktur Folder Penting

```plaintext
project1/
├── bin/          # Konfigurasi port server (www)
├── config/       # Konfigurasi koneksi MySQL ke Database
├── model/        # Query-query database (Model_Kategori, Model_Produk)
├── public/       # Folder statis (CSS, script.js klien)
├── routes/       # Definisi endpoint URL (Controller logic)
├── views/        # Halaman frontend (.ejs files)
│   ├── kategori/ # Antarmuka halaman manajemen kategori
│   ├── produk/   # Antarmuka halaman manajemen produk
│   └── partials/ # Potongan kode re-use (Navigasi, Message, Head)
└── app.js        # File utama inisialisasi modul express
```

## ⚙️ Cara Menjalankan Project

1. **Clone/Download** project ke komputer.
2. Buka terminal di dalam direktori project.
3. Jalankan `npm install` untuk mengunduh semua dependencies yang dibutuhkan.
4. Pastikan layanan database **MySQL** (XAMPP/Laragon) Anda sedang berjalan, dan sesuaikan kredensial di dalam folder `config/database.js` jika diperlukan.
5. Jalankan `npm start` untuk menyalakan mode auto-reload menggunakan nodemon.
6. Akses aplikasi melalui browser browser pada URL: `http://localhost:3000`.

---
*Dibuat untuk keperluan Workshop Pemrograman.*
