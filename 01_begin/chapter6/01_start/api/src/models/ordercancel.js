"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderCancel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderCancel.init(
    {
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
      totalPrice: { type: DataTypes.NUMBER, allowNull: false },
      shippingAddress: { type: DataTypes.JSON },
      paymentMethod: { type: DataTypes.STRING, allowNull: false },
      paymentResult: { type: DataTypes.JSON },

      isPaid: { type: DataTypes.BOOLEAN, allowNull: false },

      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      payment_method_type: { type: DataTypes.STRING, allowNull: true },
      card_info: { type: DataTypes.JSON, allowNull: true },

      cancelData: { type: DataTypes.JSON, allowNull: true },
      cancelDate: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      tableName: "ordersCancel",
      modelName: "OrdersCancel",
    }
  );
  return OrderCancel;
};
