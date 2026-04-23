var express = require("express");
var router = express.Router();
const Kategori = require("../../model/Model_Kategori");
const multer = require("multer");
const upload = multer();




/* GET home page. */
router.get("/", async function (req, res, next) {
  let rows = await Kategori.getAll();
  return res.status(200).json({
    status: "200 OK",
    message: "Data berhasil diambil",
    data: rows,
  });
});

router.get("/:id", async function(req, res, next){
  const kategori = req.params.id;
  Kategori.getById(kategori)
  .then((data) => {
    if(!data){
        return res.status(404).json({
            status: "404 Not Found",
            message: "Data tidak ditemukan",
            data: null,
          });
    }
    return res.status(200).json({
      status: "200 OK",
      message: "Data berhasil diambil",
      data: data,
    })
  })
  .catch((err) => {
    return res.status(500).json({
      status: "500 Internal Server Error",
      message: "Data gagal diambil",
      data: err,
    })
  });
})


router.post("/store", upload.none(), function(req, res, next){

  const kategori = req.body.nama_kategori;
  if (!kategori) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Nama kategori tidak boleh kosong",
    });
  }
  Kategori.store(kategori)
    .then((result) => {
      return res.status(200).json({
        status: "200 OK",
        message: "Data berhasil ditambahkan",
        data: result,
      })
    })
    .catch((err) => {
        return res.status(500).json({
          status: "500 Internal Server Error",
          message: "Data gagal ditambahkan",
          data: err,
        })
    });
})


router.get("/delete/:id", function(req, res, next){
  const idKategori = req.params.id;
  Kategori.delete(idKategori)
    .then((result) => {
      return res.status(200).json({
        status: "200 OK",
        message: "Data berhasil dihapus",
        data: result,
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500 Internal Server Error",
        message: "Data gagal dihapus",
        data: err,
      })
    });
})


router.get("/edit/:id", function(req, res, next){
  const idKategori = req.params.id;
  Kategori.getById(idKategori)
    .then((data) => {
      return res.status(200).json({
        status: "200 OK",
        message: "Data berhasil diambil",
        data: data,
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500 Internal Server Error",
        message: "Data gagal diambil",
        data: err,
      })
    });
})

router.post("/update/:id", upload.none(), function(req, res, next){

  const idKategori = req.params.id;
  const namaKategori = req.body.nama_kategori;
  if (!namaKategori) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Nama kategori tidak boleh kosong",
    });
  }
  Kategori.update(idKategori, namaKategori)
    .then((result) => {
      return res.status(200).json({
        status: "200 OK",
        message: "Data berhasil diubah",
        data: result,
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500 Internal Server Error",
        message: "Data gagal diubah",
        data: err,
      })
    });
})



module.exports = router;
