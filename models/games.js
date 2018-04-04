'use strict';
module.exports = (sequelize, DataTypes) => {
  var games = sequelize.define('games', {
    id: DataTypes.INTEGER,
    black: DataTypes.INTEGER,
    white: DataTypes.INTEGER,
    turn: DataTypes.INTEGER
  }, {});
  games.associate = function(models) {
    // associations can be defined here
  };
  return games;
};