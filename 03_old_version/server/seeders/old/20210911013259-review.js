"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "reviews",
      [
        {
          // 1차
          productId: "023c05af-90b5-49bb-b6b3-7c284e0428c6",
          orderId: "202172111749733",
          rating: 5,
          comments: "정말 좋습니다",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c07af-90b5-49bb-b6b3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",
          rating: 4,
          comments: "정말 정말 좋습니다",

          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-b8b1-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 3,
          comments: "보통입니다",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },

        {
          productId: "041c05af-10b2-49bd-b6b3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 4,
          comments: "좋아요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-a6a3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 1,
          comments: "나빠요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-b6b3-7c574e0428c6",

          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 2,
          comments: "별로네요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          // 2차
          productId: "041c05af-90b5-49bb-b6b3-7c574e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 5,
          comments: "정말 좋습니다",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-b6b3-7c574e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 4,
          comments: "정말 정말 좋습니다",

          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-a6a3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 3,
          comments: "보통입니다",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },

        {
          productId: "041c05af-90b5-49bb-a6a3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 4,
          comments: "좋아요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-a6a3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 1,
          comments: "나빠요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-a6a3-7c284e0428c6",

          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 2,
          comments: "별로네요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          // 1차
          productId: "041c05af-10b2-49bd-b6b3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 5,
          comments: "정말 좋습니다",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-10b2-49bd-b6b3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 4,
          comments: "정말 정말 좋습니다",

          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-b8b1-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 3,
          comments: "보통입니다",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },

        {
          productId: "041c05af-10b2-49bd-b6b3-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 4,
          comments: "좋아요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c05af-90b5-49bb-b8b1-7c284e0428c6",
          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 1,
          comments: "나빠요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          productId: "041c07af-90b5-49bb-b6b3-7c284e0428c6",

          userId: "aef5a148-6b78-48f2-bbc4-b23472049f17",

          rating: 2,
          comments: "별로네요",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
