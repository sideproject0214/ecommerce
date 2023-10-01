"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          uuid: "023c05af-90b5-49bb-b6b3-7c284e0428c6",
          userId: "041c05af-90b5-49bb-b6b3-7c284e0428c6",
          name: "회사원셔츠 4종세트",
          image:
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-1.jpg",
          thumbnail: [
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-1.jpg",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-2.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-2.png",
          ],
          description:
            "옷장에 하나쯤은 있어야 할 머스트 해브 아이템! 캐주얼 또는 포멀룩 어디에도 매칭할 수 있는 폴라 보이즈 옥스포트 셔츠",
          brand: "폴라",
          category: "남자정장",
          size: '{ "95": 3, "100": 10, "105": 10, "110": 7 }',
          price: 120000,
          countInStock: 30,
          rating: 5,
          numReviews: 1,
          sale: 30,
          freeShipping: true,
          deliveryFee: 0,
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          uuid: "041c07af-90b5-49bb-b6b3-7c284e0428c6",
          userId: "041c05af-90b5-49bb-b6b3-7c284e0428c6",
          name: "회사원셔츠 2종세트",
          image:
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-2.png",
          thumbnail: [
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-2.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-1.jpg",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-2.png",
          ],
          description:
            "간절기 머스트 해브 아이템!!! 회사원 셔츠를 알뜰하게 구매해 보세요!",
          brand: "플로랄프로란",
          category: "남자정장",
          size: '{ "95": 3, "100": 9, "105": 10, "110": 7 }',
          price: 90000,
          countInStock: 29,
          rating: 3,
          numReviews: 2,
          sale: 10,
          freeShipping: false,
          deliveryFee: 3500,
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          uuid: "041c05af-90b5-49bb-b8b1-7c284e0428c6",
          userId: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
          name: "신입사원 정장세트",
          image:
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/apparel-1.png",
          thumbnail: [
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/apparel-1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-2.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-2.png",
          ],
          description: "멀란지그레이 하운드투스 익스트림 하프 정장",
          brand: "지이크파란오비",
          category: "남자정장",
          size: '{ "95": 3, "100": 0, "105": 10, "110": 7 }',
          price: 500000,
          countInStock: 20,
          rating: 2.3,
          numReviews: 3,
          sale: 20,
          freeShipping: false,
          deliveryFee: 2500,
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },

        {
          uuid: "041c05af-10b2-49bd-b6b3-7c284e0428c6",
          userId: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
          name: "에어조던 23 시리즈",
          image:
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-1.png",
          thumbnail: [
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-2.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-2.png",
          ],
          description: "다시 돌아온 에어조던 시리즈",
          brand: "나이스",
          category: "운동화",
          size: '{"240": 3, "250": 10, "260": 10, "270": 5, "270": 7, "280": 5 }',
          price: 200000,
          countInStock: 35,
          rating: 4.3,
          numReviews: 4,
          sale: 20,
          freeShipping: false,
          deliveryFee: 3500,
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },

        {
          uuid: "041c05af-90b5-49bb-a6a3-7c284e0428c6",
          userId: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
          name: "발렌시아 운동화",
          image:
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-2.png",
          thumbnail: [
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-2.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-2.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-2.png",
          ],
          description: "수식어가 필요없는 명품 운동화",
          brand: "발렌시아",
          category: "운동화",

          size: '{ "240": 3, "250": 10, "260": 10, "270": 1, "280": 3 }',
          price: 1200000,
          countInStock: 27,
          rating: 2.2,
          numReviews: 5,
          sale: 20,
          freeShipping: true,
          deliveryFee: 3500,
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          uuid: "041c05af-90b5-49bb-b6b3-7c574e0428c6",
          userId: "041c05af-90b5-45bb-b6b3-7c284e0428c6",
          name: "여자 정장 일자바지 슬랙스",
          image:
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/woman-pants1.png",
          thumbnail: [
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/woman-pants1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/man-shirts-2.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-1.png",
            "https://side-ecommerce.s3.ap-northeast-2.amazonaws.com/footwear-2.png",
          ],
          description: "가성비 최고, 색감과 핏감 모두 완벽한 일자핏 정장슬랙스",
          brand: "바이더웨이텐",
          category: "여자정장",
          size: '{ "44": 3, "55": 30, "66": 23, "77": 7 }',
          price: 50000,
          countInStock: 63,
          rating: 4.9,
          numReviews: 3.3,
          sale: 10,
          freeShipping: false,
          deliveryFee: 4000,
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
