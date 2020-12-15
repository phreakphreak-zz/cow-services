const knnclassifiersController = {};
const { Knn } = require("../../services/ia/Knn");
const knn = new Knn();
const logger = require("../../services/logger/index");

knnclassifiersController.generateClassifier = async (req, res, next) => {
  try {
    if (!knn.getClassifier) {
      const state = await knn.createClassifier();
      if (!state) {
        throw "error classifiers not created";
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

knnclassifiersController.load = async (req, res, next) => {
  try {
    const { component } = req.params;
    const resource = `/${component}/dataset.json`;
    await knn.loadClassifier(resource);
    // if (!state) {
    //   throw "error at classifiers load";
    // }
    req.params.component = component;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
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
      component
    } = req.body;
    console.log(req.body);
    console.log(typeof x);
    const tensor = await knn.convertTensor([
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

    req.params.component=component;
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
    const tensor = await knn.convertTensor([C, F, K]);

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
      label,
    } = req.body;
    const tensor = await knn.convertTensor([
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
    
    const { label, tensor,component } = req.params;
    await knn.setExampleClassifier(tensor, label);
    console.log("example added");

    req.params.component=component;
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
};

knnclassifiersController.save = async (req, res, next) => {
  try {
    const { component } = req.params;
    const resource = `/${component}/dataset.json`;
    //console.log(resource);
    const state = await knn.saveClassifier(resource);

    if(!state){
      throw "error saving file json";
    }
    knn.setClassifier=null;
    res.status(200).json({ message: "ok" });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
};

knnclassifiersController.predict = async (req, res, next) => {
  try {
    const {tensor}=req.params;
    const response = await knn.predictClassifier(tensor);
    res.status(200).json({response});
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
};

module.exports = knnclassifiersController;
