var express = require("express");
const { connect } = require("../config/database");
var router = express.Router();

var connection = require("../config/database.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM Kategori", function (err, data) {
    if (err) {
      req.flash("Error", err);
    } else {
      res.render("kategori", {
        data: data,
        title: "Kategori",
      });
    }
  });

});

router.get("/create", function(req, res, next){
  res.render("create", {
    title: "Create Kategori",
    nama_kategori: ""
  })
})

router.post("/store", function(req, res, next){
  const kategori = req.body.nama_kategori;

  const query = "INSERT INTO Kategori (nama_kategori) VALUES (?)";

  connection.query(query, [kategori], function(err, result){
    if(err){
      console.error("Gagal Memasukkan Data, ERROR : ", err);
      return res.status(500).send("Terjadi Kesalahan Saat Memasukkan Data : ", err);
    }
    
    res.redirect("/kategori");
  })
})

router.get("/delete/:id", function(req, res, next){
  const idKategori = req.params.id ;

  const query = "DELETE FROM Kategori WHERE id_kategori = ?";
  connection.query(query, [idKategori], function(err, result){
    if(err){
      console.error("Error : ", err);
      return res.status(500).send("Terjadi Kesalahan, Error : ", err);
    }

    res.redirect("/kategori");
  })
})

router.get("/edit/:id", function(req, res, next){
  const idKategori = req.params.id;

  const query = "SELECT * FROM Kategori Where id_kategori = ?";
  connection.query(query, [idKategori], function(err, result){
    if(err){
      console.error("Error : ", err);
      return res.status(500).send("Terjadi Kesalahan, Error : ", err);
    }

    res.render("edit", {
      data: result[0],
      title: "Edit Kategori"
    })
  })
})

router.post("/update/:id", function(req, res, next){
  const idKategori = req.params.id;
  const namaKategori = req.body.nama_kategori;

  const query = "UPDATE Kategori SET nama_kategori = ? WHERE id_kategori = ?";
  connection.query(query, [namaKategori, idKategori], function(err, result){
    if(err){
      console.error("Error : ", err);
      return res.status(500).send("Terjadi Kesalahan, Error : ", err);
    }

    res.redirect("/kategori");
  })
})


module.exports = router;
