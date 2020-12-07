const accelerometer = require("./accelerometer/service");
const cows = require("./cows/service");

const devices = require("./devices/service");

const gyro = require("./gyro/service");

module.exports = function (app) {
  //app.configure(users);
  app.configure(accelerometer);
  app.configure(cows);
  app.configure(devices);
  app.configure(gyro);
};
