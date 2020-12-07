module.exports = function (app) {
    const modelName = "thermometer";
    const mongooseClient = app.get("mongooseClient");
  
    const { Schema, model } = mongooseClient;
  
    const schema = new Schema(
      {
        data: {
          deviceId: {
            type: String,
          },
          C: {
            type: Number,
          },
          F: {
            type: Number,
          },
          K: {
            type: Number,
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
  