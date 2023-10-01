"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "google2ID", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "google2ID", Sequelize.STRING);
  },
};
