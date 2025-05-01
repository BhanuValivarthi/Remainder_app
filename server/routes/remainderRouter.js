const express = require("express");
const router = express.Router({ mergeParams: true });

const remainder = require("../controllers/remainderController");

router.route("/createRemainder").post(remainder.createAlert);

router.route("/deleteRemainder/:taskId").get(remainder.deleteAlert);

router.route("/getallRemainders").get(remainder.getallRemainders);

module.exports = router;

