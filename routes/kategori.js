var express = require("express");
const { connect } = require("../config/database");
var router = express.Router();
const Kategori = require("../model/Model_Kategori");

var connection = require("../config/database.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let rows = await Kategori.getAll();
  res.render("kategori/index", {
    title: "Kategori",
    data: rows,
  });
});

router.get("/create", function(req, res, next){
  res.render("kategori/create", {
    title: "Create Kategori",
    nama_kategori: ""
  })
})

router.post("/store", function(req, res, next){
  const kategori = req.body.nama_kategori;
  Kategori.store(kategori)
    .then(() => {
      req.flash("success", "Kategori berhasil ditambahkan!");
      res.redirect("/kategori");
    })
    .catch((err) => {
      console.error("Gagal Memasukkan Data, ERROR : ", err);
      return res.status(500).send("Terjadi Kesalahan Saat Memasukkan Data : " + err);
    });
})

router.get("/delete/:id", function(req, res, next){
  const idKategori = req.params.id;
  Kategori.delete(idKategori)
    .then(() => {
      req.flash("success", "Kategori berhasil dihapus!");
      res.redirect("/kategori");
    })
    .catch((err) => {
      console.error("Error : ", err);
      return res.status(500).send("Terjadi Kesalahan, Error : " + err);
    });
})

router.get("/edit/:id", function(req, res, next){
  const idKategori = req.params.id;
  Kategori.getById(idKategori)
    .then((data) => {
      res.render("kategori/edit", {
        data,
        title: "Edit Kategori"
      });
    })
    .catch((err) => {
      console.error("Error : ", err);
      return res.status(500).send("Terjadi Kesalahan, Error : " + err);
    });
})

router.post("/update/:id", function(req, res, next){
  const idKategori = req.params.id;
  const namaKategori = req.body.nama_kategori;
  Kategori.update(idKategori, namaKategori)
    .then(() => {
      req.flash("success", "Kategori berhasil diubah!");
      res.redirect("/kategori");
    })
    .catch((err) => {
      console.error("Error : ", err);
      return res.status(500).send("Terjadi Kesalahan, Error : " + err);
    });
})


module.exports = router;
