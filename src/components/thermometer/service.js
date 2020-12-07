const createModel = require("./model");
const hooks = require("./hooks");
const { Thermometer } = require("./class");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: false,
  };

  app.use("/thermometer", new Thermometer(options, app));

  const service = app.service("thermometer");

  service.hooks(hooks);
};
