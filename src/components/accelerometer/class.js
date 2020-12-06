const { Service } = require("feathers-mongoose");

exports.Accelerometer = class Accelerometer extends (
  Service
) {
  // service.find({params:{}}) GET /messages
  // service.find({params:{unread:true}}) GET /messages?unread=true
  async find(params) {
    return await super.find(params);
  }

  //   async findLastById() {
  //     await super.get(id, params, async () => {
  //       return await super.find({
  //         "data.deviceId": id,
  //       });
  //     });
  //   }

  // service.get(1) GET /messages/1
  async get(id, params, callback) {
    // console.log(id);
    // if (!callback) {
    //   return await super.find({
    //     "data.deviceId": id,
    //     // $sort: {
    //     //   $natural: -1,
    //     // }
    //   });
    // } else {
    //   callback(id);
    // }

    return await super.get(id, params);
  }

  // service.create(body) POST /messages
  // service.on("created");
  async create(data, params) {
    console.log(data);
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

  // service.update(1,body) PUT /messages/1
  // service.on("updated");
  async update(id, data, params) {}

  // service.patch(1,body) PATCH /messages/1
  // service.on("patched");
  async patch(id, data, params) {}

  // service.remove(1) DELETE /messages/1
  // service.on("removed");
  async remove(id, params) {}
};
