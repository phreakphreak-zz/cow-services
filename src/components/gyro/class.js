const { Service } = require("feathers-mongoose");

exports.Gyro = class Gyro extends (
  Service
) {
  async find(params) {
    return await super.find(params);
  }

  async get(id, params) {
    return await super.get(id, params);
  }

  async create(data, params) {
    const { deviceId, x, y, z, pitch, roll, yaw, isCalibrated } = data;

    const gyroData = {
      data: {
        deviceId,
        x,
        y,
        z,
        pitch,
        roll,
        yaw,
        isCalibrated,
      },
    };

    return await super.create(gyroData, params);
  }
  async update(id, data, params) {}

  async patch(id, data, params) {}

  async remove(id, params) {}
};
