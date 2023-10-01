"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.UUID,
      },
      orderItems: {
        // userUUID: DataTypes.UUID,
        // productUUID: DataTypes.UUID,
        // size: DataTypes.STRING,
        // total: DataTypes.NUMBER,
        // maxTotal: DataTypes.NUMBER,
        // price: DataTypes.NUMBER,
        // name: DataTypes.STRING,
        // image: DataTypes.STRING,
        // deliveryFee: DataTypes.NUMBER,
        type: DataTypes.ARRAY(DataTypes.JSON),
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("carts");
  },
};
