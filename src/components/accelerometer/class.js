const { Service } = require("feathers-mongoose");

exports.Accelerometer = class Accelerometer extends (
  Service
) {
  async find(params) {
    return await super.find(params);
  }

  async get(id, params) {
    return await super.get(id, params);
  }

  async create(data, params) {
    const {
      x,
      y,
      z,
      pitch,
      roll,
      inclination,
      orientation,
      acceleration,
      deviceId,
    } = data;

    const accelerometerData = {
      data: {
        deviceId: deviceId,
        x,
        y,
        z,
        pitch,
        roll,
        inclination,
        orientation,
        acceleration,
      },
    };
    return await super.create(accelerometerData, params);
  }

  async update(id, data, params) {}

  async patch(id, data, params) {}

  async remove(id, params) {}
};
