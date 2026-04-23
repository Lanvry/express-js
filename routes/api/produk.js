var express = require("express");
var router = express.Router();
const Produk = require("../../model/Model_Produk");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });





/* GET home page. */
router.get("/", async function (req, res, next) {
  let rows = await Produk.getAll();
  return res.status(200).json({
    status: "200 OK",
    message: "Data berhasil diambil",
    data: rows,
  });
});

router.get("/:id", async function(req, res, next){
    const idProduk = req.params.id;
    Produk.getById(idProduk)
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
        });
    })
    .catch((err)=>{
        return res.status(500).json({
            status: "500 Internal Server Error",
            message: "Data gagal diambil",
            error: err,
        });
    })
})

router.post("/store", upload.single("gambar"), function(req, res, next){
    const { nama_produk, harga, kategori, stok } = req.body;
    const gambar = req.file ? req.file.filename : null;
    
    Produk.store(nama_produk, harga, stok, kategori, gambar)
    .then((result) => {
        return res.status(200).json({
            status: "200 OK",
            message: "Data berhasil ditambahkan",
            data: result,
        });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500 Internal Server Error",
        message: "Data gagal ditambahkan",
        error: err,
      })
    });
})


router.post("/update/:id", upload.single("gambar"), async function(req, res, next){
    const idProduk = req.params.id;
    const { nama_produk, harga, kategori, stok } = req.body;
    const gambar = req.file ? req.file.filename : null;

    try {
        const produkLama = await Produk.getById(idProduk);
        if (!produkLama) {
            return res.status(404).json({
                status: "404 Not Found",
                message: "Data tidak ditemukan",
            });
        }

        if (gambar && produkLama.gambar) {
            const oldPath = path.join(__dirname, "../../public/images", produkLama.gambar);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        const finalGambar = gambar || produkLama.gambar;
        await Produk.update(idProduk, nama_produk, harga, stok, kategori, finalGambar);
        
        return res.status(200).json({
            status: "200 OK",
            message: "Data berhasil diubah",
        });
    } catch (err) {
        return res.status(500).json({
            status: "500 Internal Server Error",
            message: "Data gagal diubah",
            error: err,
        });
    }
})

router.get("/delete/:id", async function(req, res, next){
    const idProduk = req.params.id;
    try {
        const produk = await Produk.getById(idProduk);
        if (produk && produk.gambar) {
            const imagePath = path.join(__dirname, "../../public/images", produk.gambar);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await Produk.delete(idProduk);
        return res.status(200).json({
            status: "200 OK",
            message: "Data berhasil dihapus",
        });
    } catch (err) {
        return res.status(500).json({
            status: "500 Internal Server Error",
            message: "Data gagal dihapus",
            error: err,
        });
    }
})

module.exports = router;

