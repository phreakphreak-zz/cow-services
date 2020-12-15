require("dotenv").config();
const logger = require("./services/logger/index");
const app = require("./app");
const port = process.env.PORT || app.get("port");
const host = app.get("host");
const server = app.listen(port);
const { connection } = app.get("mongooseClient");

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);
server.on("listening", () => {
  logger.info(`Server on http://${host}:${port}`);
});

connection.once("open", () => {
  logger.info("Database is connected");
});
connection.on("error", () => {
  logger.error("Database is disconnected");
});