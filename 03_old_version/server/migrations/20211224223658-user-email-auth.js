"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "emailToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "isVerified", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "emailToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.removeColumn("users", "isVerified", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },
};
