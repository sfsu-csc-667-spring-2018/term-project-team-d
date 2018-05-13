const models = require('../../models')

module.exports.populate = function(gameId) {
  models.game_pieces.bulkCreate([
    {game_id: gameId, piece_id: 4, x:1, y:1},
    {game_id: gameId, piece_id: 2, x:2, y:1},
    {game_id: gameId, piece_id: 3, x:3, y:1},
    {game_id: gameId, piece_id: 5, x:4, y:1},
    {game_id: gameId, piece_id: 6, x:5, y:1},
    {game_id: gameId, piece_id: 3, x:6, y:1},
    {game_id: gameId, piece_id: 2, x:7, y:1},
    {game_id: gameId, piece_id: 4, x:8, y:1},
    {game_id: gameId, piece_id: 1, x:1, y:2},
    {game_id: gameId, piece_id: 1, x:2, y:2},
    {game_id: gameId, piece_id: 1, x:3, y:2},
    {game_id: gameId, piece_id: 1, x:4, y:2},
    {game_id: gameId, piece_id: 1, x:5, y:2},
    {game_id: gameId, piece_id: 1, x:6, y:2},
    {game_id: gameId, piece_id: 1, x:7, y:2},
    {game_id: gameId, piece_id: 1, x:8, y:2},
    {game_id: gameId, piece_id: 1, x:1, y:7},
    {game_id: gameId, piece_id: 1, x:2, y:7},
    {game_id: gameId, piece_id: 1, x:3, y:7},
    {game_id: gameId, piece_id: 1, x:4, y:7},
    {game_id: gameId, piece_id: 1, x:5, y:7},
    {game_id: gameId, piece_id: 1, x:6, y:7},
    {game_id: gameId, piece_id: 1, x:7, y:7},
    {game_id: gameId, piece_id: 1, x:8, y:7},
    {game_id: gameId, piece_id: 4, x:1, y:8},
    {game_id: gameId, piece_id: 2, x:2, y:8},
    {game_id: gameId, piece_id: 3, x:3, y:8},
    {game_id: gameId, piece_id: 6, x:4, y:8},
    {game_id: gameId, piece_id: 5, x:5, y:8},
    {game_id: gameId, piece_id: 3, x:6, y:8},
    {game_id: gameId, piece_id: 2, x:7, y:8},
    {game_id: gameId, piece_id: 4, x:8, y:8}    
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