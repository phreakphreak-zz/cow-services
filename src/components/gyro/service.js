const { Gyro } = require("./class");
const hooks = require("./hooks");
const createModel = require("./model");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: false,
  };

  app.use("/gyro", new Gyro(options, app));

  const service = app.service("gyro");

  service.hooks(hooks);
};
