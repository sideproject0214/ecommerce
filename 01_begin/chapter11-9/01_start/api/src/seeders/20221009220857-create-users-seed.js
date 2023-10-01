"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        uuid: "041c05af-90b5-49bb-b6b3-7c284e0428c6",
        name: "Admin User",
        email: "admin@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: true,
        googleID: "041c05af-90b5-49bb-b6b3-7c284e0428c1",
        naverID: "041c05af-90b5-49bb-b6b3-7c284e0428c1",
        kakaoID: "041c05af-90b5-49bb-b6b3-7c284e0428c2",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
      },
      {
        uuid: "041c05af-90b5-49bb-b6b3-7c284e0429c6",
        name: "아이유",
        email: "iu@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: false,
        googleID: "041c05af-90b5-49bb-b6b3-7c284e0429c6",
        naverID: "041c05af-90b5-49bb-b6b3-7c284e0429c6",
        kakaoID: "041c05af-90b5-49bb-b6b3-7c284e0429c6",
        createdAt: "2021-01-02",
        updatedAt: "2021-01-02",
      },
      {
        uuid: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
        name: "SSaple",
        email: "ssaple@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: false,
        googleID: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
        naverID: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
        kakaoID: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
        createdAt: "2021-01-03",
        updatedAt: "2021-01-03",
      },

      {
        uuid: "042c05af-90b5-49bb-b6b3-7c284e0428c6",
        name: "Admin User2",
        email: "admin2@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: true,
        googleID: "042c05af-90b5-49bb-b6b3-7c284e0428c1",
        naverID: "042c05af-90b5-49bb-b6b3-7c284e0428c1",
        kakaoID: "042c05af-90b5-49bb-b6b3-7c284e0428c2",
        createdAt: "2021-01-04",
        updatedAt: "2021-01-04",
      },
      {
        uuid: "043c05af-90b5-49bb-b6b3-7c284e0429c6",
        name: "아이유2",
        email: "iu2@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: false,
        googleID: "043c05af-90b5-49bb-b6b3-7c284e0429c6",
        naverID: "043c05af-90b5-49bb-b6b3-7c284e0429c6",
        kakaoID: "043c05af-90b5-49bb-b6b3-7c284e0429c6",
        createdAt: "2021-01-05",
        updatedAt: "2021-01-05",
      },
      {
        uuid: "044c05af-90b5-45bb-b6b3-7c284e0428c6",
        name: "SSaple2",
        email: "ssaple2@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: false,
        googleID: "044c05af-90b5-45bb-b6b3-7c284e0428c6",
        naverID: "044c05af-90b5-45bb-b6b3-7c284e0428c6",
        kakaoID: "044c05af-90b5-45bb-b6b3-7c284e0428c6",
        createdAt: "2021-01-06",
        updatedAt: "2021-01-06",
      },

      {
        uuid: "045c05af-90b5-49bb-b6b3-7c284e0428c6",
        name: "Admin User3",
        email: "admin3@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: true,
        googleID: "045c05af-90b5-49bb-b6b3-7c284e0428c1",
        naverID: "045c05af-90b5-49bb-b6b3-7c284e0428c1",
        kakaoID: "045c05af-90b5-49bb-b6b3-7c284e0428c2",
        createdAt: "2021-01-07",
        updatedAt: "2021-01-07",
      },
      {
        uuid: "046c05af-90b5-49bb-b6b3-7c284e0429c6",
        name: "아이유3",
        email: "iu3@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: false,
        googleID: "046c05af-90b5-49bb-b6b3-7c284e0429c6",
        naverID: "046c05af-90b5-49bb-b6b3-7c284e0429c6",
        kakaoID: "046c05af-90b5-49bb-b6b3-7c284e0429c6",
        createdAt: "2021-01-08",
        updatedAt: "2021-01-08",
      },
      {
        uuid: "047c05af-90b5-45bb-b6b3-7c284e0428c6",
        name: "SSaple3",
        email: "ssaple3@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: false,
        googleID: "047c05af-90b5-45bb-b6b3-7c284e0428c6",
        naverID: "047c05af-90b5-45bb-b6b3-7c284e0428c6",
        kakaoID: "047c05af-90b5-45bb-b6b3-7c284e0428c6",
        createdAt: "2021-01-09",
        updatedAt: "2021-01-09",
      },

      {
        uuid: "048c05af-90b5-49bb-b6b3-7c284e0428c6",
        name: "Admin User4",
        email: "admin4@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: true,
        googleID: "048c05af-90b5-49bb-b6b3-7c284e0428c1",
        naverID: "048c05af-90b5-49bb-b6b3-7c284e0428c1",
        kakaoID: "048c05af-90b5-49bb-b6b3-7c284e0428c2",
        createdAt: "2021-01-10",
        updatedAt: "2021-01-10",
      },
      {
        uuid: "049c05af-90b5-49bb-b6b3-7c284e0429c6",
        name: "아이유4",
        email: "iu4@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: false,
        googleID: "049c05af-90b5-49bb-b6b3-7c284e0429c6",
        naverID: "049c05af-90b5-49bb-b6b3-7c284e0429c6",
        kakaoID: "049c05af-90b5-49bb-b6b3-7c284e0429c6",
        createdAt: "2021-01-11",
        updatedAt: "2021-01-11",
      },
      {
        uuid: "049c05af-90b5-45bb-b6b3-7c284e0428c6",
        name: "SSaple4",
        email: "ssaple4@example.com",
        password:
          "$2a$10$L/YmXVQY1JGYzJ2/XQULQOgNznOZ21z4.MWmq0TSoskHX25oBXHOa",
        isAdmin: false,
        googleID: "049c05af-90b5-45bb-b6b3-7c284e0428c6",
        naverID: "049c05af-90b5-45bb-b6b3-7c284e0428c6",
        kakaoID: "049c05af-90b5-45bb-b6b3-7c284e0428c6",
        createdAt: "2021-01-12",
        updatedAt: "2021-01-12",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
