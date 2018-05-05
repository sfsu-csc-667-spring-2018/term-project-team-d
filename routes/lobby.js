var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
const AuthController = require('../auth/AuthController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('lobby');
});

io.on('connection', function(socket){
  console.log('a user connected');
})

module.exports = router;
