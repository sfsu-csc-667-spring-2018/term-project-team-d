'use strict';
module.exports = (sequelize, DataTypes) => {
  var game_pieces = sequelize.define('game_pieces', {
    game_id: DataTypes.INTEGER,
    piece_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    captured: DataTypes.BOOL,
    x: DataTypes.INT,
    y: DataTypes.INT
  }, {});
  game_pieces.associate = function(models) {
    // associations can be defined here
  };
  return game_pieces;
};