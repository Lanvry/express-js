var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "jokowi",
    desc: "Pria Solo",
  });
});

router.get("/information", function (req, res, next) {
  res.render("jokowi", {
    title: "jokowi",
    desc: "Pria Solo",
    jenkel: "Undifined",
    age: "10000",
  });
});


module.exports = router;
