var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const data = [
      {name : "Arjuna"},
      {name : "Amel"},
      {name : "Ilyas"},
    ]
  res.render("kategori", {
    data : data,
    title : "Kategori"
  });
});



module.exports = router;
