var express = require('express');
var router = express.Router();
const GameController = require('../db/games/index')
const PieceController = require('../db/games/pieces')
const AuthController = require('../auth/AuthController')
let game

router.get('/:id', function(request,response) {
  GameController.getGame(request,response).then(game => {
    PieceController.getPieces(game.id).then(pieces =>{
      response.render('game',{
        title: 'game - CSC 667',
        description: 'Term Project',
        css: ['game.css'],
        games: game,
        pieces: pieces,
        user: request.user
      });
    });
  });
});

router.post('/create',  GameController.create)

module.exports = router;