"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: "productId",
        targetKey: "uuid",
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Order, {
        foreignKey: "orderId",
      });
    }
  }
  Review.init(
    {
      // productId: { type: DataTypes.UUID },
      // userId: { type: DataTypes.UUID },
      // orderId: { type: DataTypes.STRING },
      userName: { type: DataTypes.STRING, allowNull: false },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      comments: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: "reviews",
      modelName: "Review",
    }
  );
  return Review;
};
