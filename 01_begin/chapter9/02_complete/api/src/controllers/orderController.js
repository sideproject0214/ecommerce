const { Op } = require("sequelize"); // ch7
const { Order, sequelize } = require("../models"); //ch7
const asyncHandler = require("express-async-handler");
const { trackingLogenByNumber } = require("../utils/webscrapping"); //ch7
const { TZ_SEOUL } = require("../config/timezone"); //ch7

// @route    POST  api/order/submit
// @desc     kakao pay
// @access   Public ch6

exports.submitOrder = asyncHandler(async (req, res) => {
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
});

// @route    POST  api/order/shipping
// @desc     내 주문 리스트 조회
// @access   Public ch7

exports.getMyshipping = asyncHandler(async (req, res) => {
  try {
    console.log(req.userUUID, "getMyshipping22");
    console.log(req.query, req.params, "getMyshipping33");

    const today = new Date();
    const myOrder = await Order.findAll({
      where: {
        userId: req.userUUID,
        isPaid: true, // 이걸 넣어야 결제 실패한 것은 안불러온다
        createdAt: {
          [Op.gt]: new Date(
            new Date().setDate(
              today.getDate() - (Number(req.query.pages) + 1) * 30
            )
          ),
          [Op.lte]: new Date(
            new Date().setDate(today.getDate() - Number(req.query.pages) * 30)
          ),
        },
      },
      attributes: {
        include: [
          [
            sequelize.literal(
              `"Order"."createdAt"::timestamptz AT TIME ZONE '${TZ_SEOUL}'`
            ),
            "createdAt",
          ],
        ],
      },
    });

    const myTrackingNumberFiltered = myOrder.map(
      (Order) => Order.dataValues.trackingNumber
    );
    const myOrderIdFiltered = myOrder.map((Order) => Order.dataValues.orderId);

    console.log(myOrderIdFiltered, "myOrderIdFiltered");

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

    await updateMyOrder();

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
});
