const express = require("express");
const mongoose = require("mongoose");

const routes = require("./server/routes");


const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
  { autoIndex: false, useNewUrlParser: true, useCreateIndex: true, }
);

// Start the API server
// app.listen(PORT, function () {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('search', function(query){
    console.log(query)
    io.emit('search', query);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});




// Start the API server
http.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


