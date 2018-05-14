'use strict';
module.exports = (sequelize, DataTypes) => {
  const gamepiece = sequelize.define('game_pieces', {
    game_id: DataTypes.INTEGER,
    piece_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    captured: DataTypes.BOOLEAN,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return gamepiece;
};
