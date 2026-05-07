var express = require("express");
var router = express.Router();
const Produk = require("../model/Model_Produk");
const Kategori = require("../model/Model_Kategori");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET all produk
router.get("/", async function (req, res, next) {
  let rows = await Produk.getAll();
  res.render("produk/index", {
    title: "Produk",
    data: rows,
  });
});

// GET create produk form
router.get("/create", async function(req, res, next){
  let kategori = await Kategori.getAll();
  res.render("produk/create", {
    title: "Tambah Produk",
    kategori
  });
});

// POST store produk
router.post("/store", upload.single("gambar"), function(req, res, next){
  const { nama_produk, harga, stok, id_kategori } = req.body;
  const gambar = req.file ? req.file.filename : null;
  Produk.store(nama_produk, harga, stok, id_kategori, gambar)
    .then(() => {
      res.redirect("/produk");
    })
    .catch((err) => {
      console.error("Gagal Memasukkan Data, ERROR : ", err);
      return res.status(500).send("Terjadi Kesalahan Saat Memasukkan Data : " + err);
    });
});

// GET edit produk form
router.get("/edit/:id", async function(req, res, next){
  const idProduk = req.params.id;
  try {
    const data = await Produk.getById(idProduk);
    const kategori = await Kategori.getAll();
    res.render("produk/edit", {
      data,
      kategori,
      title: "Edit Produk"
    });
  } catch (err) {
    console.error("Error : ", err);
    return res.status(500).send("Terjadi Kesalahan, Error : " + err);
  }
});

// POST update produk
router.post("/update/:id", upload.single("gambar"), async function(req, res, next){
  const idProduk = req.params.id;
  const { nama_produk, harga, stok, id_kategori } = req.body;
  const gambar = req.file ? req.file.filename : null;

  try {
    if (gambar) {
      const produkLama = await Produk.getById(idProduk);
      if (produkLama && produkLama.gambar) {
        const oldPath = path.join(__dirname, "../public/images", produkLama.gambar);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }
    await Produk.update(idProduk, nama_produk, harga, stok, id_kategori, gambar);
    res.redirect("/produk");
  } catch (err) {
    console.error("Error : ", err);
    return res.status(500).send("Terjadi Kesalahan, Error : " + err);
  }
});

// GET delete produk
router.get("/delete/:id", async function(req, res, next){
  const idProduk = req.params.id;
  try {
    const produk = await Produk.getById(idProduk);
    if (produk && produk.gambar) {
      const imagePath = path.join(__dirname, "../public/images", produk.gambar);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } 
    }
    await Produk.delete(idProduk);
    res.redirect("/produk");
  } catch (err) {
    console.error("Error : ", err);
    return res.status(500).send("Terjadi Kesalahan, Error : " + err);
  }
});

module.exports = router;
