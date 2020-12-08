const { Router } = require("@feathersjs/express");
const router = Router();
const knnclassifiers = require("../components/knnclassifiers/routes");
router.use("/knnclassifiers", knnclassifiers);
module.exports = router;
