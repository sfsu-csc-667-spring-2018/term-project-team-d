var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
const AuthController = require('../auth/AuthController');
var port = process.env.PORT || 3000;

/* GET users listing. */
router.get('/', AuthController.isAuthenticated, function(req, res, next) {
  res.render('lobby',
    { title: 'Chess Lobby',
      user: req.user,
      description: 'Term Project',
      css: ['bootstrap.min.css','font-awesome.min.css'],
      js: ['jquery.min.js','bootstrap.min.js','chat.js','lobby.js','game.js']
    }
  );
});

io.on('connection', function(socket){
  console.log(user + ' is connected');
})

module.exports = router;
