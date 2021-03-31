'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Games', [{
      appid: "233150",
      align: "center"
    },{
      appid: "239200",
      align: "absolute-center",
    },{
      appid: "57300",
      align: "absolute-center",
    },{
      appid: "65930",
      align: "center",
    },{
      appid: "469820",
      align: "absolute-center",
    },{
      appid: "105600",
      align: "absolute-center",
    },{
      appid: "322330",
      align: "left-stretch",
    },{
      appid: "245170",
      align: "left-stretch",
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
