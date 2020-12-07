module.exports = function (app) {
  const modelName = "devices";
  const mongooseClient = app.get("mongooseClient");

  const { Schema, model } = mongooseClient;

  const schema = new Schema(
    {
      number: {
        type: Number,
        default: 0,
      },
      board: {
        type: String,
      },
      moduleWifi: {
        type: String,
      },
      macAddress: {
        type: String,
      },
      thermometer: {
        type: String,
      },
      accelerometer: {
        type: String,
      },
      gyro: {
        type: String,
      },
      tokenDevice: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return model(modelName, schema);
};
