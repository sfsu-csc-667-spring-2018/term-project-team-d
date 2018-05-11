const models = require('../../models')
const gamePieces = require('./pieces.js')
let gameId = ''

module.exports.create = function(request, response) {
  let newGame = {
    black: 0,
    white: request.user.id,
    turn: request.user.id
  }  
  models.games.create(newGame)
    .then(game => {
      gameId = game.dataValues.id
      gamePieces.populate(gameId)
      return response.redirect('/game/' + gameId)
    }).catch(err => {
      console.log(err)
    });
}

module.exports.getGame = function(request, response){
  models.games.findOne({
    where: {
      id: request.params.id
    }
  }).then(data => {
    return data;
  }).catch(err => {
    console.log(err)
  });
}