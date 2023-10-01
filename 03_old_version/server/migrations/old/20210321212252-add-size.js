"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "size", {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      unique: false,
      allowNull: true,
    });
    await queryInterface.addColumn("posts", "sizeRemain", {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      unique: false,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("posts", "size");
    await queryInterface.removeColumn("posts", "sizeRemain");
  },
};
