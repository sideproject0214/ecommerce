"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "address",
      [
        {
          recipient: "홍길동",
          shippingAddress: "서울특별시 관악구 신림동 대학로 123, 123동 1234호",
          postcode: "12345",
          address: "서울특별시 관악구 신림동 대학로 123",
          detail1: "123동 1234호",
          detail2: "싸플아파트",
          phone1: "010",
          phone2: "1234",
          phone3: "5678",
          userId: "67ed3132-5504-4186-b871-8d65aa673bb5",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          recipient: "홍길순",
          shippingAddress: "서울특별시 관악구 신림동 대학로 123, 123동 1001호",
          postcode: "12345",
          address: "서울특별시 관악구 신림동 대학로 123",
          detail1: "123동 1001호",
          detail2: "싸플아파트",
          phone1: "010",
          phone2: "1234",
          phone3: "5678",
          userId: "67ed3132-5504-4186-b871-8d65aa673bb5",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          recipient: "김철수",
          shippingAddress: "서울특별시 관악구 신림동 대학로 123, 117동 101호",
          postcode: "12345",
          address: "서울특별시 관악구 신림동 대학로 123",
          detail1: "117동 101호",
          detail2: "싸플아파트",
          phone1: "010",
          phone2: "1234",
          phone3: "5678",
          userId: "67ed3132-5504-4186-b871-8d65aa673bb5",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          recipient: "박영희",
          shippingAddress: "서울특별시 관악구 신림동 대학로 123, 118동 1011호",
          postcode: "12345",
          address: "서울특별시 관악구 신림동 대학로 123",
          detail1: "118동 1011호",
          detail2: "싸플아파트",
          phone1: "010",
          phone2: "1234",
          phone3: "5678",
          userId: "67ed3132-5504-4186-b871-8d65aa673bb5",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          recipient: "아이유",
          shippingAddress: "서울특별시 관악구 문화대로 123, 112동 1011호",
          postcode: "20154",
          address: "서울특별시 관악구 문화대로 123",
          detail1: "112동 1011호",
          detail2: "",
          phone1: "010",
          phone2: "1234",
          phone3: "5678",
          userId: "67ed3132-5504-4186-b871-8d65aa673bb5",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("address", null, {});
  },
};
