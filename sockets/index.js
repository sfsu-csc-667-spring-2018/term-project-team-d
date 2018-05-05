const socketio = require('socket.io');
//const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const passport = require('config/passport');

const io = socketio();

// io.use(
//   passportSocketIo.authorize({
//     key: 'connect.sid',
//     secret: process.env.COOKIE_SECRET,
//     store: new (require('connect-pg-simple')(session))(),
//     passport,
//     cookieParser
//   })
// );


/*
  socket connection stuff goes here I think
*/

module.exports = io;