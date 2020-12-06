
const accelerometer = require("./accelerometer/service");

module.exports = function (app) {
  //app.configure(users);
  app.configure(accelerometer);
};
