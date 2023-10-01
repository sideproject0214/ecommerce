"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        uuid: "041c05af-90b5-49bb-b6b3-7c284e0428c6",
        name: "Admin User",
        email: "admin@example.com",
        password: 123,
        isAdmin: true,
        googleID: "041c05af-90b5-49bb-b6b3-7c284e0428c6",
        naverID: "041c05af-90b5-49bb-b6b3-7c284e0428c6",
        kakaoID: "041c05af-90b5-49bb-b6b3-7c284e0428c6",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
      },
      {
        uuid: "041c05af-90b5-49bb-b6b3-7c284e0429c6",
        name: "아이유",
        email: "iu@example.com",
        password: 123,
        isAdmin: false,
        googleID: "041c05af-90b5-49bb-b6b3-7c284e0429c6",
        naverID: "041c05af-90b5-49bb-b6b3-7c284e0429c6",
        kakaoID: "041c05af-90b5-49bb-b6b3-7c284e0429c6",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
      },
      {
        uuid: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
        name: "SSaple",
        email: "ssaple@example.com",
        password: 123,
        isAdmin: false,
        googleID: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
        naverID: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
        kakaoID: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
