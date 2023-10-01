"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("ordersCancel", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      orderItems: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      totalPrice: { type: DataTypes.DECIMAL, allowNull: false },
      shippingAddress: { type: DataTypes.JSON },
      paymentMethod: { type: DataTypes.STRING, allowNull: false },
      paymentResult: { type: DataTypes.JSON },
      isPaid: { type: DataTypes.BOOLEAN, allowNull: false },

      paidAt: { type: DataTypes.DATE, allowNull: true },

      payment_method_type: { type: DataTypes.STRING, allowNull: true },
      card_info: { type: DataTypes.JSON, allowNull: true },

      cancelData: { type: DataTypes.JSON, allowNull: true },
      cancelDate: { type: DataTypes.DATE, allowNull: true },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("ordersCancel");
  },
};
