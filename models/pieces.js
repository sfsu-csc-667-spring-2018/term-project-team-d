'use strict';
module.exports = (sequelize, DataTypes) => {
  const Piece = sequelize.define('pieces', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Piece;
};
