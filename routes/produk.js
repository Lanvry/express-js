var express = require("express");
var router = express.Router();
const Produk = require("../model/Model_Produk");

// GET all produk
router.get("/", async function (req, res, next) {
  let rows = await Produk.getAll();
  res.render("produk/index", {
    title: "Produk",
    data: rows,
  });
});

// GET create produk form
const Kategori = require("../model/Model_Kategori");

router.get("/create", async function(req, res, next){
  let kategori = await Kategori.getAll();
  res.render("produk/create", {
    title: "Tambah Produk",
    kategori
  });
});

// POST store produk
router.post("/store", function(req, res, next){
  const { nama_produk, harga, stok, id_kategori } = req.body;
  Produk.store(nama_produk, harga, stok, id_kategori)
    .then(() => {
      req.flash("success", "Produk berhasil ditambahkan!");
      res.redirect("/produk");
    })
    .catch((err) => {
      console.error("Gagal Memasukkan Data, ERROR : ", err);
      return res.status(500).send("Terjadi Kesalahan Saat Memasukkan Data : " + err);
    });
});

// GET edit produk form
router.get("/edit/:id", async function(req, res, next){
  try {
    const idProduk = req.params.id;
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
router.post("/update/:id", function(req, res, next){
  const idProduk = req.params.id;
  const { nama_produk, harga, stok, id_kategori } = req.body;
  Produk.update(idProduk, nama_produk, harga, stok, id_kategori)
    .then(() => {
      req.flash("success", "Produk berhasil diubah!");
      res.redirect("/produk");
    })
    .catch((err) => {
      console.error("Error : ", err);
      return res.status(500).send("Terjadi Kesalahan, Error : " + err);
    });
});

// GET delete produk
router.get("/delete/:id", function(req, res, next){
  const idProduk = req.params.id;
  Produk.delete(idProduk)
    .then(() => {
      req.flash("success", "Produk berhasil dihapus!");
      res.redirect("/produk");
    })
    .catch((err) => {
      console.error("Error : ", err);
      return res.status(500).send("Terjadi Kesalahan, Error : " + err);
    });
});

module.exports = router;
