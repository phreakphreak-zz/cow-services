const { Router } = require("@feathersjs/express");
const router = Router();
const {
  generateClassifier,
  load,
  dataAccelerometer,
  dataThermometer,
  dataGyro,
  setExample,
  save,
  predict,
} = require("./controller");

// router.get();

router.post(
  "/accelerometer",
  dataAccelerometer,
  generateClassifier,
  load,
  setExample,
  save
);

// router.get();

// router.put();

// router.delete();

// router.patch();

module.exports = router;
