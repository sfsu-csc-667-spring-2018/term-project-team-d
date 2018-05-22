var express = require('express');
var router = express.Router();
const AuthController = require('../auth/AuthController');
var GameController = require('../db/games/index')

/* GET users listing. */
router.get('/', AuthController.isAuthenticated, function(req, res, next) {
  GameController.getDefaultGames()
  .then(data => {
      res.render('lobby',
      { title: 'Chess Lobby',
        user: req.user,
        description: 'Term Project',
        css: ['bootstrap.min.css','font-awesome.min.css'],
        js: ['jquery.min.js','bootstrap.min.js','chat.js','lobby.js','game.js'],
        games: data
      }
    );
  })
  
});

module.exports = router;
