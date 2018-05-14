'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pieces', [{
        name: 'pawn',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'knight',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'bishop',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'rook',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'queen',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'king',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};