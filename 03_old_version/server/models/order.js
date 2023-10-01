"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "uuid",
      });
      this.hasMany(models.Review, { foreignKey: "orderId" });
      this.hasMany(models.Post, {
        foreignKey: "uuid",
        as: "orderedProductIds",
      });
    }
  }

  Order.init(
    {
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      orderItems: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      totalPrice: { type: DataTypes.NUMBER, allowNull: false },
      shippingAddress: { type: DataTypes.JSON },

      recipient: { type: DataTypes.STRING, allowNull: false },
      postcode: { type: DataTypes.STRING, allowNull: false }, // number로 하면 02345는 2345로 저장됨
      fullPhoneNumber: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      detailAddress: { type: DataTypes.STRING, allowNull: false },
      extraAddress: { type: DataTypes.STRING, allowNull: false },
      phone1: { type: DataTypes.STRING, allowNull: false },
      phone2: { type: DataTypes.STRING, allowNull: false },
      phone3: { type: DataTypes.STRING, allowNull: false },

      paymentMethod: { type: DataTypes.STRING, allowNull: false },
      paymentResult: { type: DataTypes.JSON },
      shippingPrice: { type: DataTypes.NUMBER, allowNull: false },
      isPaid: { type: DataTypes.BOOLEAN, allowNull: false },
      isDelivered: { type: DataTypes.BOOLEAN, allowNull: true },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
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
    },
    {
      sequelize,
      tableName: "orders",
      modelName: "Order",
    }
  );

  return Order;
};
