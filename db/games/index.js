const models = require( '../../models' )
const gamePieces = require( './pieces.js' )
let gameId = ''

module.exports.create = function( request, response ) {
  let newGame = {
    black: 0,
    white: request.user.id,
    turn: request.user.id
  }  
  models.games.create( newGame )
    .then( game => {
      gameId = game.dataValues.id
      gamePieces.populate( gameId, game.dataValues.white )
      return response.redirect( '/game/' + gameId )
    } ).catch( err => {
      console.log( err )
    } );
}

module.exports.getGame = function( request, response ){
  return models.games.findOne( {
    where: {
      id: request.params.id
    }
  } ).catch( err => {
    console.log( err )
  } );
}

module.exports.joinGame = function( game, user ){
  if( game.black === 0 ){
    game.black = user;
    gamePieces.updateUser( game )
  }
}

module.exports.getDefaultGames = function(){
  return models.games.findAll( {
    order: [
      ['id', 'DESC']
    ],
    limit: 10
  }).then( data => {
    console.log( data );
    return data;
  } )
  .catch( err => {
    console.log( err )
  } );
}