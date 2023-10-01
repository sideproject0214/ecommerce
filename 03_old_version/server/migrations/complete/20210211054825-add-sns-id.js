"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "googleID", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "naverID", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "kakaoID", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "googleID");
    await queryInterface.removeColumn("users", "naverID");
    await queryInterface.removeColumn("users", "kakaoID");
  },
};
