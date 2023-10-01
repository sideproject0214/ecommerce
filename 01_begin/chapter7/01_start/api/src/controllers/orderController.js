const { Order } = require("../models");

const asyncHandler = require("express-async-handler");
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
