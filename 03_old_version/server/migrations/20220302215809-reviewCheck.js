"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "reviewCheck", {
      type: Sequelize.ARRAY(Sequelize.UUID),

      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders", "reviewCheck");
  },
};
