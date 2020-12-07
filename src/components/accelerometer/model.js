module.exports = function (app) {
  const modelName = "accelerometer";
  const mongooseClient = app.get("mongooseClient");
  const { Schema,model } = mongooseClient;
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

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return model(modelName, schema);
};
