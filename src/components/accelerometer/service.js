
const { Accelerometer } = require('./class');
const createModel = require('./model');
const hooks = require('./hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    //paginate: app.get('paginate')
    paginate:false
  };

  app.use('/accelerometer', new Accelerometer(options, app));

  const service = app.service('accelerometer');

  service.hooks(hooks);
};
