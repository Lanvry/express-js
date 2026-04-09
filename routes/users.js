var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('users/index', {
      title: 'Users',
      user: req.session.user
    });
  }else{
    res.redirect('/login');
  }
});

module.exports = router;
