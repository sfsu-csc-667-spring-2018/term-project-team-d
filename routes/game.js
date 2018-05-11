var express = require('express');
var router = express.Router();
const GameController = require('../db/games/')
const AuthController = require('../auth/AuthController')

router.get('/:id', function(request,response) {
  game = GameController.getGame(request,response);
  response.render('game',
      {
        title: 'game - CSC 667',
        description: 'Term Project',
        css: ['game.css'],
        games: game
      }
    ); 
});

router.post('/create',  GameController.create)

module.exports = router;