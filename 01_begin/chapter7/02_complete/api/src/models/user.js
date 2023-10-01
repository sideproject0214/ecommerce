"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: "uuid" });
      this.hasMany(models.Address, { foreignKey: "userId" });
      this.hasMany(models.Token, { foreignKey: "uuid" });
      this.hasMany(models.Order, { foreignKey: "userId", sourceKey: "uuid" });
      this.hasMany(models.Cart, { foreignKey: "userId" });
      this.hasMany(models.Review, { foreignKey: "userId" });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
      };
    }
  }

  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleID: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      naverID: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      kakaoID: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        // type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   is: ["admin", "seller", "consummer"],
        // },
        // defaultValue: "consummer",
        defaultValue: false,
      },
      emailToken: { type: DataTypes.STRING, allowNull: true },
      isVerified: { type: DataTypes.BOOLEAN, allowNull: true },
      pwEmailAddress: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        },
        beforeUpdate: async (user, options) => {
          // console.log(user, "user");
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        },
      },
    }
  );
  User.prototype.isMatchedPassword = async function (enteredPassword, _) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  // true or false 만 반환함
  return User;
};
