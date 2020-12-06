module.exports = function (app) {
  const modelName = "accelerometer";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      data: {
        deviceId: String,
        x: Number,
        y: Number,
        z: Number,
        pitch: Number,
        roll: Number,
        inclination: Number,
        orientation: Number,
        acceleration: Number,
      },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
