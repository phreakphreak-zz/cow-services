const { Service } = require("feathers-mongoose");

exports.Thermometer = class Thermometer extends (
  Service
) {
  async find(params) {
    return await super.find(params);
  }

  async get(id, params) {
    return await super.get(id, params);
  }

  async create(data, params) {
    const { deviceId, C, F, K } = data;

    const thermometerData = {
      data: {
        deviceId,
        C,
        F,
        K,
      },
    };

    return await super.create(thermometerData, params);
  }
  async update(id, data, params) {}

  async patch(id, data, params) {}

  async remove(id, params) {}
};
