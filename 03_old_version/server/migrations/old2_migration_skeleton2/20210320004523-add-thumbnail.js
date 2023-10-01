"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "thumbnail", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      unique: false,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("posts", "thumbnail");
  },
};
