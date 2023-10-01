"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn("orders", "reviewCheck", {
    //   type: Sequelize.JSONB,

    //   allowNull: true,
    // });
    await queryInterface.addColumn("orders", "orderedProductIds", {
      type: Sequelize.ARRAY(Sequelize.UUID),

      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn("orders", "reviewCheck");
    await queryInterface.removeColumn("orders", "orderedProductIds");
  },
};
