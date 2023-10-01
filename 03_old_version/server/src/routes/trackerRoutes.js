const express = require("express");
const router = express.Router();

const { trackingLogen } = require("../controller/trackerController");

// @route    POST  api/tracker/logen/:id
// @desc     운송장 번호를 통해 배송조회를 한다
// @access   Public
router.route("/logen/:id").get(trackingLogen);

module.exports = router;
