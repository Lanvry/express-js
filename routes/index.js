var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");
const Model_Users = require("../model/Model_Users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "jokowi",
    desc: "Pria Solo",
  });
});

router.get("/login", function (req, res, next) {
  res.render("auth/login", {
    title: "Login",
    messages: req.flash()
  });
});

router.post("/loginSave", async function(req, res, next) {
  const { email, password } = req.body;
  try {
     let Data = await Model_Users.Login(email);
     if (Data.length > 0) {
       const user = Data[0];
       if (bcrypt.compareSync(password, user.password)) {
          console.log('login berhasil');
          req.session.isLoggedIn = true;
          res.redirect("/");
       } else {
          req.flash('error', 'Kombinasi email dan password salah!');
          res.redirect('/login');
       }
     } else {
        req.flash('error', 'Kombinasi email dan password salah!');
        res.redirect('/login');
     }
  } catch(err) {
     req.flash('error', 'Terjadi kesalahan sistem');
     res.redirect('/login');
  }
});

router.get("/register", function (req, res, next) {
  res.render("auth/register", {
    title: "Register",
    messages: req.flash()
  });
});

router.post("/registerSave", async function(req, res, next) {
  const { email, password } = req.body;
  try {
     const hashPassword = bcrypt.hashSync(password, 10);
     await Model_Users.Register(email, hashPassword);
     req.flash('success', 'Berhasil mendaftar! Silakan login.');
     res.redirect("/login");
  } catch(err) {
     req.flash('error', 'Gagal mendaftar, coba lagi!');
     res.redirect('/register');
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/login');
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
