const mongoose = require("mongoose");
const logger = require("../logger/index");

module.exports = function (app) {
  const { driver, user, pass, cluster, dbname } = app.get("mongodb");
  const URI = `${driver}://${user}:${pass}@${cluster}/${dbname}?retryWrites=true&w=majority`;
  const options={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
  const mongooseConnection = mongoose.createConnection(URI,options);
  mongoose.connect(URI,options)
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  
  mongoose.Promise = global.Promise;
  app.set("mongooseClient", mongoose);
  app.set("mongooseConnection",mongooseConnection);
};
