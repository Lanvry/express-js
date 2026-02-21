var express = require("express");
var router = express.Router();


router.post("/username", function (req, res, next) {
  const input = req.body.text;
  const jenkel = req.body.jenkel;
  const age = req.body.age;
  res.render("jokowi", {
    title: input,
    desc: "Pria Solo",
    jenkel: jenkel,
    age: age,
  });
});


module.exports = router;
