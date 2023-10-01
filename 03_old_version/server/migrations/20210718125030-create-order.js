"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("orders", {
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

      recipient: { type: DataTypes.STRING, allowNull: false },
      postcode: { type: DataTypes.STRING, allowNull: false },
      fullPhoneNumber: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      detailAddress: { type: DataTypes.STRING, allowNull: false },
      extraAddress: { type: DataTypes.STRING, allowNull: false },
      phone1: { type: DataTypes.STRING, allowNull: false },
      phone2: { type: DataTypes.STRING, allowNull: false },
      phone3: { type: DataTypes.STRING, allowNull: false },

      paymentMethod: { type: DataTypes.STRING, allowNull: false },
      paymentResult: { type: DataTypes.JSON },
      shippingPrice: { type: DataTypes.DECIMAL, allowNull: false },
      isPaid: { type: DataTypes.BOOLEAN, allowNull: false },
      isDelivered: { type: DataTypes.BOOLEAN, allowNull: false },
      paidAt: { type: DataTypes.DATE, allowNull: true },
      deliveredAt: { type: DataTypes.DATE, allowNull: true },
      tid: { type: DataTypes.STRING, allowNull: true },
      pg_token: { type: DataTypes.STRING, allowNull: true },
      payment_method_type: { type: DataTypes.STRING, allowNull: true },
      card_info: { type: DataTypes.JSON, allowNull: true },
      // from: { type: DataTypes.JSON, allowNull: true },
      // to: { type: DataTypes.JSON, allowNull: true },
      // state: { type: DataTypes.JSON, allowNull: true },
      // progresses: { type: DataTypes.ARRAY(DataTypes.JSON), allowNull: true },
      trackingNumber: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      trackingContents: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
      reviewCheck: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("orders");
  },
};
