const { Devices } = require("./class");
const createModel = require("./model");
const hooks = require("./hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    //paginate: app.get('paginate')
    paginate: false,
  };

  app.use("/devices", new Devices(options, app));

  const service = app.service("devices");

  service.hooks(hooks);
};
