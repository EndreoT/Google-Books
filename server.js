const express = require("express");
const http = require('http')
const mongoose = require("mongoose");
const morgan = require('morgan');
const socket = require('socket.io')

const routes = require("./server/routes");


class App {

  constructor() {
    this.app = express();

    // Set up socket.io
    this.server = http.createServer(this.app);
    this.io;
   
    this.initApp();
  }

  initApp() {
    this.initDB();
    this.initSocketIO();
    this.initMiddleware();
    this.initStaticAssets();
    this.initRoutes();
    this.initExpressConnection();
  }

  initSocketIO() {
    this.io = socket(this.server);

    this.io.on('connection', function (socket) {
      console.log('a user connected');
      // this.io.emit('search', 'yo');
      // socket.on('search', function (query) {
      //   console.log(query)
      //   this.io.emit('search', query);
      // });
      socket.on('disconnect', function () {
        console.log('user disconnected');
      });
    });
  }

  // Connect to mongoose DB
  initDB() {
    const mongoDBUrl = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

    mongoose
      .connect(mongoDBUrl, {
        autoIndex: false, useNewUrlParser: true, useCreateIndex: true,
      }).then(() => "You are now connected to Mongo!")
      .catch(err => console.error("Something went wrong!", err));
  }

  initMiddleware() {
    // Define middleware here
    this.app.use(morgan("tiny"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // Bind socketIO to each request object
    this.app.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }

  initStaticAssets() {
    // Serve up static assets (usually on heroku)
    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static("client/build"));
    }
  }

  initRoutes() {
    // Add routes, both API and view
    this.app.use(routes);
  }

  initExpressConnection() {
    const PORT = process.env.PORT || 3001;

    // Start the API server
    this.server.listen(PORT, function () {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
  }
}

const APP = new App();
