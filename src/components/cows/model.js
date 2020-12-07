module.exports = function (app) {
  const modelName = "cows";
  const mongooseClient = app.get("mongooseClient");
  const { Schema, model } = mongooseClient;
  const schema = new Schema(
    {
      //marca
      brand: {
        type: String,
      },
      //edad
      ageMonth: {
        type: Number,
      },
      //numero
      number: {
        type: Number,
      },
      //fecha ingreso
      entryDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
      //fecha salida
      exitDate: {
        type: Date,
      },
      //fecha nacimientobirthday
      //peso inicial
      startingWeight: {
        //type: Schema.Types.Decimal128,
        type: Number,
      },
      //peso final
      finalWeight: {
        //type: Schema.Types.Decimal128,
        type: Number,
      },
      //raza
      race: {
        type: String,
      },
      //genero
      gender: {
        type: String,
      },
      //estado
      state: {
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
