var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const Model_Users = require('../model/Model_Users');

router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('users/index', {
      title: 'Profil Pengguna',
      user: req.session.user,
      messages: req.flash()
    });
  }else{
    res.redirect('/login');
  }
});

router.get('/changepassword', function(req, res, next) {
  if(req.session.user){
    res.render('users/changepassword', {
      title: 'Ubah Password',
      user: req.session.user,
      messages: req.flash()
    });
  }else{
    res.redirect('/login');
  }
});

router.post('/changepassword', async function(req, res, next) {
  if(!req.session.user){
    return res.redirect('/login');
  }

  const { old_password, new_password, confirm_password } = req.body;

  if (new_password !== confirm_password) {
    req.flash('error', 'Password baru dan konfirmasi tidak cocok!');
    return res.redirect('/users/changepassword');
  }

  try {
    const id_users = req.session.user.id_users;
    const userData = await Model_Users.GetById(id_users);

    if (!userData) {
      req.flash('error', 'User tidak ditemukan.');
      return res.redirect('/users/changepassword');
    }

    if (bcrypt.compareSync(old_password, userData.password)) {
      const hashPassword = bcrypt.hashSync(new_password, 10);
      await Model_Users.UpdatePassword(id_users, hashPassword);
      req.flash('success', 'Berhasil mengubah password!');
      res.redirect('/users/changepassword');
    } else {
      req.flash('error', 'Password lama salah!');
      res.redirect('/users/changepassword');
    }
  } catch(err) {
    req.flash('error', 'Terjadi kesalahan sistem.');
    res.redirect('/users/changepassword');
  }
});

module.exports = router;
