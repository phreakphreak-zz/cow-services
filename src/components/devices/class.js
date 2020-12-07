const { Service } = require("feathers-mongoose");

exports.Devices = class Devices extends (
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
      number,
      board,
      moduleWifi,
      macAddress,
      thermometer,
      accelerometer,
      gyro,
      tokenDevice,
    } = data;

    const devicesData = {
      number,
      board,
      moduleWifi,
      macAddress,
      thermometer,
      accelerometer,
      gyro,
      tokenDevice,
    };
    return await super.create(devicesData, params);
  }

  async update(id, data, params) {}

  async patch(id, data, params) {}

  async remove(id, params) {}
};
