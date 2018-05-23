var express = require( 'express' );
var router = express.Router();
var GameController = require('../db/games/index')
const AuthController = require( '../auth/AuthController' );

/* GET users listing. */
router.get( '/', AuthController.isAuthenticated, function( request, response, next ) {
  GameController.getDefaultGames()
  .then( data => {
    response.render( 'lobby',
      { title: 'Chess Lobby',
        user: request.user,
        description: 'Term Project',
        css: ['bootstrap.min.css','font-awesome.min.css'],
        js: ['jquery.min.js','bootstrap.min.js','chat.js','lobby.js','game.js'],
        games: data
      }
    );
  } )  
} );


module.exports = router;
