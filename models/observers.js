'use strict';
module.exports = (sequelize, DataTypes) => {
  var observers = sequelize.define('observers', {
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  observers.associate = function(models) {
    // associations can be defined here
  };
  return observers;
};