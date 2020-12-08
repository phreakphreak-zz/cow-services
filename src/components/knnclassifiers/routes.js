const { Router } = require("@feathersjs/express");
const router = Router();
const {
  create,
  dataAccelerometer,
  dataThermometer,
  dataGyro,
  setExample,
  save,
  predict,
} = require("./controller");

// router.get();

router.post("/",create,dataAccelerometer,setExample,save);

// router.get();

// router.put();

// router.delete();

// router.patch();

module.exports = router;
