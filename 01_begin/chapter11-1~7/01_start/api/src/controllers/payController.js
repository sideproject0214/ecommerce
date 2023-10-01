const axios = require("axios");
const { Order, sequelize, OrdersCancel, Address } = require("../models");
const asyncHandler = require("express-async-handler");
// const dotenv = require("dotenv");
// dotenv.config();

// @route    POST  api/pay/kakao
// @desc     kakao pay
// @access   Public

exports.postKakaoPay = asyncHandler(async (req, res) => {
  try {
    console.log("req.query", req.query);
    // console.log(process.env.KAKAO_APP_ADMIN_KEY);
    const item = req.query;
    // const orderItem = req.query

    const config = {
      headers: {
        // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
        Authorization: `KakaoAK ${process.env.KAKAO_APP_ADMIN_KEY}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: process.env.KAKAO_CID,
        partner_order_id: item.partner_order_id,
        partner_user_id: item.partner_user_id,
        item_name: item.item_name,
        quantity: item.quantity,
        total_amount: item.total_amount,
        vat_amount: item.vat_amount,
        tax_free_amount: item.tax_free_amount,
        approval_url: `${process.env.BACKEND_ADDRESS}/pay/kakao/redirect/success?orderId=${item.partner_order_id}`,
        fail_url: `${process.env.BACKEND_ADDRESS}/pay/kakao/redirect/failure?orderId=${item.partner_order_id}`,
        cancel_url: `${process.env.BACKEND_ADDRESS}/pay/kakao/redirect/cancel?orderId=${item.partner_order_id}`,
      },
    };

    const { data } = await axios.post(
      "https://kapi.kakao.com/v1/payment/ready",
      // 결제 준비 API는 POST 메소드라고 한다.
      {},
      config
    );

    // const payResult = await Order.create({ userId: user})

    console.log(data, "kakao pay ");

    if (data?.tid) {
      const update = await Order.update(
        { tid: data.tid },
        { where: { orderId: item.partner_order_id } }
      );
      console.log(update, "tid update success!!");
      res.json(data);
    } else {
      res.redirect("/");
    }
  } catch (e) {
    console.log(e);
  }
});

exports.getSuccess = asyncHandler(async (req, res) => {
  console.log(req.query, "getSuccess");
  const { pg_token, orderId } = req.query;
  try {
    if (orderId) {
      await Order.update(
        { pg_token: pg_token },
        { where: { orderId: orderId } }
      );

      const result = await Order.findOne({ where: { orderId: orderId } });
      console.log(result, "getSuccess Result");

      const config = {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_APP_ADMIN_KEY}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          cid: process.env.KAKAO_CID,
          tid: result.dataValues.tid,
          partner_order_id: result.dataValues.orderId,
          partner_user_id: result.dataValues.userId,
          pg_token: result.dataValues.pg_token,
        },
      };

      const { data } = await axios.post(
        "https://kapi.kakao.com/v1/payment/approve",
        // 결제 준비 API는 POST 메소드라고 한다.
        {},
        config
      );

      const orderedProduct = result.dataValues.orderItems;

      try {
        Promise.all(
          orderedProduct.map(async (x) => {
            console.log(x, "Max");
            // const remaining = Number(x[0].maxTotal) - Number(x[0].total);
            const remaining = x.maxTotal - x.total;
            console.log(remaining, "remaining Number");
            const result = await sequelize.query(
              `update posts set "size"="size"::jsonb || '{"${x.size}":${remaining}}' where "uuid"='${x.uuid}';`
            );
            console.log(result, "sequelize query, size ");
          })
        );
      } catch (e) {
        console.log(e);
      }

      await Order.update(
        {
          paidAt: data.approved_at,
          isPaid: true,
          payment_method_type: data.payment_method_type,
          card_info: data.card_info,
        },
        { where: { orderId: orderId } }
      );

      // const findResult = await sequelize.query(
      //   `select * from address where "userId"=${result.dataValues.userId}`
      // );
      const findResult = await Address.findOne({
        where: {
          userId: result.dataValues.userId,
          shippingAddress: result.dataValues.shippingAddress,
        },
      });
      // 무조건 첫번째는 존재하기
      console.log(findResult, "findResult");

      if (findResult === null) {
        console.log("OK");
        await Address.create({
          userId: result.dataValues.userId,
          recipient: result.dataValues.recipient,
          postcode: result.dataValues.postcode,
          shippingAddress: result.dataValues.shippingAddress,
          address: result.dataValues.address,
          detail1: result.dataValues.detailAddress,
          detail2: result.dataValues.extraAddress,
          phone1: result.dataValues.phone1,
          phone2: result.dataValues.phone2,
          phone3: result.dataValues.phone3,
        });
      }

      // console.log(address, created, "Address");

      console.log("User Order Create Success!!!");
      // console.log(data, "kakaoPay Approve Success!!");
    }

    res.redirect(`${process.env.FRONT_ADDRESS}/pay/redirect/success`);
  } catch (e) {
    console.log(e);
  }
});

exports.getFailure = asyncHandler(async (req, res) => {
  const { orderId } = req.query;
  try {
    console.log(req.query, "getFailure");
    await Order.destroy({ where: { orderId: orderId } });
    res.redirect(`${process.env.FRONT_ADDRESS}/pay/redirect/failure`);
  } catch (e) {
    console.log(e);
  }
});

exports.getCancel = asyncHandler(async (req, res) => {
  const { orderId } = req.query;
  try {
    console.log(req.query, "getCancel");
    await Order.destroy({ where: { orderId: orderId } });
    res.redirect(`${process.env.FRONT_ADDRESS}/pay/redirect/cancel`);
  } catch (e) {
    console.log(e);
  }
});

exports.postPayCancel = asyncHandler(async (req, res) => {
  console.log(req.body, "postPayCancel");
  const result = await Order.findOne({
    where: { orderId: req.body.partner_order_id },
  });

  console.log(result.dataValues.tid, "postPayCancel");

  try {
    const config = {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_APP_ADMIN_KEY}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: process.env.KAKAO_CID,
        tid: result.dataValues.tid,
        cancel_amount: req.body.cancel_amount,
        cancel_tax_free_amount: req.body.cancel_tax_free_amount,
      },
    };

    const { data } = await axios.post(
      "https://kapi.kakao.com/v1/payment/cancel",
      // 결제 준비 API는 POST 메소드라고 한다.
      {},
      config
    );

    const item = result.dataValues;
    console.log(item, "kakao pay cancel item");
    console.log(data, "kakao pay cancel data");

    if (data !== null) {
      await Order.destroy({
        where: { orderId: req.body.partner_order_id },
      });
      await OrdersCancel.create({
        orderId: data.partner_order_id,
        userId: data.partner_user_id,
        orderItems: item.orderItems,
        totalPrice: data.canceled_amount.total,
        shippingAddress: item.fullAddress,
        paymentMethod: item.paymentMethod,
        paymentResult: item.paymentResult,

        isPaid: item.isPaid,
        paidAt: item.paidAt,

        payment_method_type: item.payment_method_type,
        card_info: item.card_info,

        cancelData: data,
        cancelDate: new Date(),
      });

      const orderedProduct = result.dataValues.orderItems;

      try {
        Promise.all(
          orderedProduct.map(async (x) => {
            console.log(x, "Max");
            // const remaining = Number(x[0].maxTotal) - Number(x[0].total);
            const remaining = Number(x.maxTotal) + Number(x.total);
            console.log(remaining, "remaining Number");
            const result = await sequelize.query(
              `update posts set "size"="size"::jsonb || '{"${x.size}":${remaining}}' where "uuid"='${x.uuid}';`
            );
            console.log(result, "sequelize query, size ");
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
    // console.log(data, "kakao pay cancel");
    res.json("Cancel OK");
    // res.redirect(`${process.env.FRONT_ADDRESS}/shipping/cancel`);
  } catch (error) {
    console.log(error, "kakao pay cancel error");
    res.json("Cancel Error");
  }
});
