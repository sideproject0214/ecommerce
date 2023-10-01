"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log(models);
      // define association here
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

      phone1: { allowNull: false, type: DataTypes.NUMBER },
      phone2: { allowNull: false, type: DataTypes.NUMBER },
      phone3: { allowNull: false, type: DataTypes.NUMBER },
    },
    {
      sequelize,
      tableName: "address",
      modelName: "Address",
    }
  );

  return Address;
};
