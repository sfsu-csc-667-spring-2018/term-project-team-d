var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var favicon = require('serve-favicon');

var passport = require('passport');


var usersRouter = require('./routes/users');
var testsRouter = require('./routes/tests');
var errorRouter = require('./routes/error');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/authentication/login');
var registerRouter = require('./routes/authentication/register');
var logoutRouter = require('./routes/authentication/logout');
var lobbyRouter = require('./routes/lobby');



//var chatRouter = require('./routes/chat/message');
//var moveRouter = require('./routes/game/move');
//var gameIdRouter = require('.routes/game/id');

require('./auth/index')(passport);

if( process.env.NODE_ENV === 'development' ){
  require( "dotenv" ).config();
}

const app = express();

// app.use(
//   session({
//     store: new (require('connect-pg-simple')(session))(),
//     secret: process.env.COOKIE_SECRET,
//     saveUninitialized: false,
//     resave: false,
//     cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
//   })
// );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon('./public/favicon.ico'));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tests', testsRouter);
app.use('/error', errorRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/lobby', lobbyRouter);


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
