const { Op } = require("sequelize");

const { Order, Address } = require("../../models");
const { trackingLogenByNumber } = require("../utils/webscrapping");

// @route    POST  api/order/submit
// @desc     kakao pay
// @access   Public

exports.submitOrder = async (req, res) => {
  console.log(req.body, "submitOrder");
  const item = req.body;

  try {
    const result = await Order.findOne({
      where: { orderId: item.partner_order_id },
    });

    if (result) {
      return res.json("Order already exist");
    } else {
      console.log(item.orderItems, "submitOrder2");
      const userOrder = await Order.create({
        orderId: item.partner_order_id,
        userId: item.partner_user_id,
        userName: item.userName,
        orderItems: item.orderItems,
        shippingAddress: item.fullAddress,
        // reviewCheck: [],
        recipient: item.recipient,
        postcode: item.postcode,
        fullPhoneNumber: item.fullPhoneNumber,
        address: item.address,
        detailAddress: item.detailAddress,
        extraAddress: item.extraAddress,
        phone1: item.phone1,
        phone2: item.phone2,
        phone3: item.phone3,

        paymentMethod: item.paymentMethod,
        paymentResult: item.paymentResult,
        shippingPrice: item.shippingPrice,
        totalPrice: item.total_amount,
        isPaid: item.isPaid,
        isDelivered: item.isDelivered,
        paidAt: new Date(), // 빈값으로 넘기면 nvalid input syntax for type timestamp with time zone: "Invalid date" 에러가 발생
        // 즉, Date값은 빈 값으로 둘 수 없고, 값을 넣어야 한다. 따라서, isPaid, isDelivered가 true일때 값이 진짜이다
        deliveredAt: new Date(),
      });

      res.status(201).json(userOrder);
    }
  } catch (e) {
    console.log(e);
  }
};

// @route    POST  api/order/shipping
// @desc     내 주문 리스트 조회
// @access   Public

exports.getMyshipping = async (req, res) => {
  try {
    console.log(req.userUUID, "getMyshipping22");

    const myOrder = await Order.findAll({
      where: {
        userId: req.userUUID,
        isPaid: true, // 이걸 넣어야 결제 실패한 것은 안불러온다
        createdAt: {
          [Op.lte]: new Date(
            new Date() - req.query.pages * 30 * 24 * 60 * 60 * 1000
          ),
          [Op.gt]: new Date(
            new Date() - (req.query.pages + 1) * 30 * 24 * 60 * 60 * 1000
          ),
        },
      },
    });

    // console.log(myOrder.length, "myOrder important");
    // console.log(JSON.stringify(myOrder), "myOrder important");

    const myTrackingNumberFiltered = myOrder.map(
      (Order) => Order.dataValues.trackingNumber
    );
    const myOrderIdFiltered = myOrder.map((Order) => Order.dataValues.orderId);

    console.log(myOrderIdFiltered, "myOrderIdFiltered");

    // **** 여기는 "배송완료 필터로 조회하는 코드"
    // const filterResult = myOrder.map((Order) =>
    //   Order.dataValues.trackingContents.map((x) => x.map((x) => x.state.text))
    // );
    // console.log(filterResult, "filterResult");
    // ******************************* 여기까지

    // userId로 주문을 찾는다.
    // 이때 송장번호가 없다면 '상품준비 중', 송장번호가 있으면 조회후 최종상태는 일단 보여주고, 상세 조회하고 싶으면 클릭시 아래로 나옴
    // console.log(updateMyOrder[1], "updateMyOrder");

    const myOrderFilteredResult = await Promise.all(
      myTrackingNumberFiltered.map(async (x) => {
        // const result = await trackingLogenByNumber(x);
        // return result;

        if (x !== null) {
          const result = await trackingLogenByNumber(x);
          return result;
        }
      })
    );

    console.log(myOrderFilteredResult, "<myOrderFilteredResult>");

    let orderUpdateArray = [];

    const updateMyOrder = async () => {
      await Promise.all(
        myOrderFilteredResult.map(async (x, i) => {
          if (x === undefined) {
            orderUpdateArray.push(myOrder[i]);
          } else {
            const updateResult = await Order.update(
              {
                trackingContents: x,
              },
              {
                where: { orderId: myOrderIdFiltered[i] },
                returning: true,
                plain: true,
              }
            );
            console.log(updateResult, "updateMyOrder YYYYYYYYYYYY");
            orderUpdateArray.push(updateResult[1].dataValues);
            console.log("update complete !");
          }
        })
      );
    };

    // for (let i = 0; i < myOrderIdFiltered.length; i++) {
    //   if (!myOrderFilteredResult.includes(undefined)) {
    //     const updateResult = await Order.update(
    //       {
    //         trackingContents: myOrderFilteredResult[i],
    //       },
    //       { where: { orderId: myOrderIdFiltered[i] }, returning: true }
    //     );
    //     const reArragement = updateResult.map((x, index) => x[1][0]);

    //     orderUpdateArray.push(reArragement);
    //     // orderUpdateArray.push(updateResult);
    //   } else {
    //     orderUpdateArray = myOrder;
    //   }
    // }

    await updateMyOrder();
    // console.log(orderUpdateArray, "updateResult ");

    // const updateMyOrder = await Promise.all(
    //   myOrderIdFiltered.map(async (x) => {
    //     const updateResult = await Order.update(
    //       {
    //         trackingContents: myOrderFilteredResult,
    //       },
    //       { where: { orderId: x }, returning: true }
    //     );

    //     return updateResult;
    //   })
    // );
    //https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects/53212154
    // const lookup = orderUpdateArray.reduce((a, e) => {
    //   a[e.id] = ++a[e.id] || 0; //++a 변수 a의 값을 1 증가시킨다. 동시에 ++a의 값도 1 증가
    //   // a++ 변수 a의 값을 1 증가시키나, a++의 값은 바로 증가시키지 않는다.
    //   return a;
    // }, {});

    // 중복값 제거
    //https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects

    // 배열 관련 javascript
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/pop

    // console.log(lookup, "lookup");
    console.log(orderUpdateArray, "orderUpdateArray1111");

    const sortResult = orderUpdateArray.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    res.json(sortResult);
  } catch (e) {
    console.log(e);
  }
};
