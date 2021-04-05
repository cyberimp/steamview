'use strict';

module.exports = {
  up: async (queryInterface) => {

    return queryInterface.bulkInsert('Games', [{
      appid: 233150,
      align: "center"
    },{
      appid: 239200,
      align: "absolute-center",
    },{
      appid: 57300,
      align: "absolute-center",
    },{
      appid: 65930,
      align: "center",
    },{
      appid: 469820,
      align: "absolute-center",
    },{
      appid: 105600,
      align: "absolute-center",
    },{
      appid: 322330,//Don't Starve Together
      align: "left-stretch",
    }, {
      appid: 245170,//Skullgirls
      align: "left-stretch",
    }, {
      appid: 211260,//They Bleed Pixels
      align: "left-stretch",
    }], {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Games', null, {});
  }
};
