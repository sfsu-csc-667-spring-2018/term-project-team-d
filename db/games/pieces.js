const models = require('../../models')

module.exports.populate = function(gameId, userId) {
  models.game_pieces.bulkCreate([
    {game_id: gameId, piece_id: 4, captured: false, x:1, y:1},
    {game_id: gameId, piece_id: 2, captured: false,x:2, y:1},
    {game_id: gameId, piece_id: 3, captured: false, x:3, y:1},
    {game_id: gameId, piece_id: 5, captured: false,x:4, y:1},
    {game_id: gameId, piece_id: 6, captured: false, x:5, y:1},
    {game_id: gameId, piece_id: 3, captured: false, x:6, y:1},
    {game_id: gameId, piece_id: 2, captured: false, x:7, y:1},
    {game_id: gameId, piece_id: 4, captured: false, x:8, y:1},
    {game_id: gameId, piece_id: 1, captured: false, x:1, y:2},
    {game_id: gameId, piece_id: 1, captured: false, x:2, y:2},
    {game_id: gameId, piece_id: 1, captured: false, x:3, y:2},
    {game_id: gameId, piece_id: 1, captured: false, x:4, y:2},
    {game_id: gameId, piece_id: 1, captured: false, x:5, y:2},
    {game_id: gameId, piece_id: 1, captured: false, x:6, y:2},
    {game_id: gameId, piece_id: 1, captured: false, x:7, y:2},
    {game_id: gameId, piece_id: 1, captured: false, x:8, y:2},
    {game_id: gameId, piece_id: 1, user_id: userId, captured: false, x:1, y:7},
    {game_id: gameId, piece_id: 1, user_id: userId, captured: false, x:2, y:7},
    {game_id: gameId, piece_id: 1, user_id: userId, captured: false, x:3, y:7},
    {game_id: gameId, piece_id: 1,user_id: userId, captured: false, x:4, y:7},
    {game_id: gameId, piece_id: 1,user_id: userId, captured: false, x:5, y:7},
    {game_id: gameId, piece_id: 1,user_id: userId, captured: false, x:6, y:7},
    {game_id: gameId, piece_id: 1,user_id: userId, captured: false, x:7, y:7},
    {game_id: gameId, piece_id: 1,user_id: userId, captured: false, x:8, y:7},
    {game_id: gameId, piece_id: 4,user_id: userId, captured: false, x:1, y:8},
    {game_id: gameId, piece_id: 2,user_id: userId, captured: false, x:2, y:8},
    {game_id: gameId, piece_id: 3,user_id: userId, captured: false, x:3, y:8},
    {game_id: gameId, piece_id: 6,user_id: userId, captured: false, x:4, y:8},
    {game_id: gameId, piece_id: 5,user_id: userId, captured: false, x:5, y:8},
    {game_id: gameId, piece_id: 3,user_id: userId, captured: false, x:6, y:8},
    {game_id: gameId, piece_id: 2,user_id: userId, captured: false, x:7, y:8},
    {game_id: gameId, piece_id: 4,user_id: userId, captured: false, x:8, y:8}    
  ]).catch(err => {
    console.log(err)
  })
}
module.exports.getPieces = function(gameId) {
  return models.game_pieces.findAll({
    where: {
      game_id: gameId
    }
  }).catch(err => {
    console.log(err)
  })
}