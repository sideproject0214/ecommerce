const { trackingLogenUtil } = require("../utils/webscrapping");
const { Order } = require("../../models");

// 테스트 용 컨트롤러
exports.trackingLogen = async (req, res) => {
  // console.log(req.params, "params");
  try {
    const result = await trackingLogenUtil(req, res);
    // await Order.update({
    //   from: result.from,
    //   to: result.to,
    //   state: result.state,
    //   progresses: result.progresses,
    // });
    console.log(result);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
};
