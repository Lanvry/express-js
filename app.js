var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('express-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var kipkRouter = require('./routes/kipk');
var produkRouter = require('./routes/produk');
var kategoriRouter = require('./routes/kategori');


var ApiKategoriRouter = require('./routes/api/kategori');
var ApiProdukRouter = require('./routes/api/produk');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 hari
  },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))

app.use(flash())

app.use(function(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
});

const CheckLogin = (req, res, next) => {
  if(req.session.isLoggedIn){
    next();
  }
  else{
    res.redirect('/login');
  }
}

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/kipk', kipkRouter);
app.use('/produk', CheckLogin, produkRouter);
app.use('/users', CheckLogin, usersRouter)
app.use('/kategori', CheckLogin, kategoriRouter);

app.use('/api/kategori', ApiKategoriRouter)
app.use('/api/produk', ApiProdukRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
