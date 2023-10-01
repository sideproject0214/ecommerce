"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("address", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      recipient: {
        type: Sequelize.STRING,
      },
      shippingAddress: {
        type: Sequelize.STRING,
      },
      postcode: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      detail1: {
        type: Sequelize.STRING,
      },
      detail2: {
        type: Sequelize.STRING,
      },
      phone1: {
        type: Sequelize.STRING,
      },
      phone2: {
        type: Sequelize.STRING,
      },
      phone3: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("address");
  },
};
