var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("kipk", {
    title: "jokowi",
    desc: "Pria Solo",
  });
});



module.exports = router;
