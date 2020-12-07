module.exports = function (app) {
  const modelName = "gyro";
  const mongooseClient = app.get("mongooseClient");

  const { Schema, model } = mongooseClient;

  const schema = new Schema(
    {
      data: {
        deviceId: {
          type: String,
        },
        x: {
          type: Number,
        },
        y: {
          type: Number,
        },
        z: {
          type: Number,
        },
        pitch: {
          type: Object,
        },
        roll: {
          type: Object,
        },
        yaw: {
          type: Object,
        },
        isCalibrated: {
          type: Boolean,
        },
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
