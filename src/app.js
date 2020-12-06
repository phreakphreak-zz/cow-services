const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const logger = require("./services/logger/index");

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const database = require("./services/database/index");
const channels = require("./channels");
const hooks = require("./hooks");
const services = require("./components/index");

//Setting App
const app = express(feathers());
//app.set("port",process.env.PORT || 3000);
app.configure(configuration());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Static dir
app.use('/', express.static(app.get('public')));

// Setting Rest and SockerIO
app.configure(express.rest());
app.configure(socketio());

//Setting Database - MongoDB
app.configure(database);


//Setting Services Components
app.configure(services);

//Setting Channels
app.configure(channels);


//Error Handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

//Settings Hooks
app.hooks(hooks)

module.exports = app;