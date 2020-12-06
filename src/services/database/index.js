const mongoose = require("mongoose");
const logger = require("../logger/index");

module.exports = function (app) {
  const { driver, user, pass, cluster, dbname } = app.get("mongodb");
  const URI = `${driver}://${user}:${pass}@${cluster}/${dbname}?retryWrites=true&w=majority`;
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  app.set("mongooseClient", mongoose);
};
