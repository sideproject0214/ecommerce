"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      // this.belongsTo(models.Post, { foreignKey: "productUUID" });
    }
  }
  Cart.init(
    {
      userId: DataTypes.UUID,
      orderItems: DataTypes.ARRAY(DataTypes.JSON),
    },
    {
      sequelize,
      tableName: "carts",
      modelName: "Cart",
    }
  );
  return Cart;
};
