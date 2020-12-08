const knnclassifiersController = {};
const {
  setExampleClassifier,
  convertTensor,
  predictClassifier,
  createClassifier,
  saveClassifier
} = require("../../services/ia/knn");
const logger = require("../../services/logger/index");

//middleware
knnclassifiersController.create = async (req, res, next) => {
  try {
    const classifier = await createClassifier();
    req.params.classifier = classifier;
    console.log("knn created")
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message:error });
  }
};

knnclassifiersController.dataAccelerometer = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw "body without params";
    }
    const {
      x,
      y,
      z,
      pitch,
      roll,
      inclination,
      orientation,
      acceleration,
      action,
      label,
    } = req.body;
    console.log(req.body);
    console.log(typeof(x));
    const tensor = await convertTensor([
      x,
      y,
      z,
      pitch,
      roll,
      inclination,
      orientation,
      acceleration,
    ]);

    req.params.tensor = tensor;
    req.params.action = action;
    req.params.label = label;
    next();
  } catch (error) {

    logger.error(error);
    res.status(400).json({ message: error });
  }
};

knnclassifiersController.dataThermometer = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw "body without params";
    }
    const { C, F, K, action, label } = req.body;
    const tensor = await convertTensor([C, F, K]);

    req.params.tensor = tensor;
    req.params.action = action;
    req.params.label = label;
    next();
  } catch (error) {

    logger.error(error);
    res.status(400).json({ message: error });
  }
};

knnclassifiersController.dataGyro = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw "body without params";
    }
    const {
      x,
      y,
      z,
      pitchRate,
      pitchAngle,
      rollRate,
      rollAngle,
      yawRate,
      yawAngle,
      action,
      label
    } = req.body;
    const tensor = await convertTensor([
      x,
      y,
      z,
      pitchRate,
      pitchAngle,
      rollRate,
      rollAngle,
      yawRate,
      yawAngle,
    ]);

    req.params.tensor = tensor;
    req.params.action = action;
    req.params.label = label;
    next();
  } catch (error) {

    logger.error(error);
    res.status(400).json({ message: error });
  }
};

knnclassifiersController.setExample = async (req, res, next) => {
  try {
    const { classifier, label, tensor } = req.params;

    if (!classifier) {
      throw "classfier is not generated";
    }
    req.params.classifier = await setExampleClassifier(
      classifier,
      tensor,
      label
    );
    console.log("example added");
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
};

knnclassifiersController.save = async (req,res,next)=>{
try {
  const { classifier } = req.params;
  if (!classifier) {
    throw "classfier is not generated";
  }
  await saveClassifier(classifier);
  res.status(200).json({message:"ok"});
} catch (error) {
  logger.error(error);
    res.status(400).json({ error });
}
}


knnclassifiersController.predict = async (req, res, next) => {
  try {
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
};

module.exports = knnclassifiersController;