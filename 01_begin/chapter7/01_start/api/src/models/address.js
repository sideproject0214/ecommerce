"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Address.init(
    {
      recipient: { allowNull: false, type: DataTypes.STRING },
      shippingAddress: { allowNull: true, type: DataTypes.STRING },
      postcode: { allowNull: false, type: DataTypes.NUMBER },
      address: { allowNull: false, type: DataTypes.STRING },

      detail1: { allowNull: false, type: DataTypes.STRING },
      detail2: { allowNull: false, type: DataTypes.STRING },

      phone1: { allowNull: false, type: DataTypes.STRING },
      phone2: { allowNull: false, type: DataTypes.STRING },
      phone3: { allowNull: false, type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: "address",
      modelName: "Address",
    }
  );

  return Address;
};
