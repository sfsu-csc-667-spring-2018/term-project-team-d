module.exports = ( sequelize, DataTypes ) => {
  const Game = sequelize.define('games', {
    black: DataTypes.INTEGER,
    white: DataTypes.INTEGER,
    turn: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function( models ) {
        //associations can be defined here
      }
    }
  });
  return Game;
}