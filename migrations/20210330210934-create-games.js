'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      appid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      align: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('Games');
  }
};