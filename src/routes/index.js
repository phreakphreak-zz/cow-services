const { Router } = require("@feathersjs/express");
const router = Router();
const knnclassifiers = require("../components/knnclassifiers/routes");

const streaming = require("../components/streaming/routes")
router.use("/knnclassifiers", knnclassifiers);

router.use("/streaming",streaming)
module.exports = router;
