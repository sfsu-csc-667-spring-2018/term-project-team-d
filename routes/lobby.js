var express = require('express');
var router = express.Router();
const AuthController = require('../auth/AuthController');

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

module.exports = router;
