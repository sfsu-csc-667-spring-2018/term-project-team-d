var express = require('express');
var router = express.Router();
const GameController = require('../db/games/index')
const AuthController = require('../auth/AuthController')
const PieceController = require('../db/games/pieces')

router.get('/:id', function(request,response) {
  game = GameController.getGame(request,response);
  console.log(JSON.stringify(game))
  pieces = PieceController.getPieces(game.dataValues.id);
  console.log('!!!!!!!!!! Pieces!!!!!!!!!!!!!!!!!!')
  console.log(pieces)
  response.render('game',
      {
        title: 'game - CSC 667',
        description: 'Term Project',
        css: ['game.css'],
        games: game,
        pieces: pieces
      }
    ); 
});

router.post('/create',  GameController.create)

module.exports = router;