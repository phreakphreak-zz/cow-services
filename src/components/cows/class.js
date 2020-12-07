const { Service } = require("feathers-mongoose");

exports.Cows = class Cows extends (
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
      brand,
      ageMonth,
      number,
      entryDate,
      exitDate,
      startingWeight,
      finalWeight,
      race,
      gender,
      state,
    } = data;

    const cowsData = {
      brand,
      ageMonth,
      number,
      entryDate,
      exitDate,
      startingWeight,
      finalWeight,
      race,
      gender,
      state,
    };
    return await super.create(cowsData, params);
  }

  async update(id, data, params) {}

  async patch(id, data, params) {}

  async remove(id, params) {}
};
