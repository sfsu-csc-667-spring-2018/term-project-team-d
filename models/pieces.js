'use strict';
module.exports = (sequelize, DataTypes) => {
  var pieces = sequelize.define('pieces', {
    id: DataTypes.INTEGER,
    name: DataTypes.VARCHAR
  }, {});
  pieces.associate = function(models) {
    // associations can be defined here
  };
  return pieces;
};