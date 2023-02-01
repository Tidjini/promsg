PORT = process.env.PORT || 7777;

class Server {
  express;
  socketio;
  connections = [];

  static loadExpress() {
    //initialize express
    console.log("intialize express");
    const express = require("express");
    const http = require("http");
    const expressApp = express();
    Server.express = http.createServer(expressApp);
  }

  static loadSocketIo() {
    //init with socket.io
    console.log("intialize socket.io");
    const io = require("socket.io");
    Server.socketio = io(Server.express);
  }
  static startListening() {
    console.log("start listening");
    Server.express.listen(PORT);
    console.log("SERVER STRATING... ON PORT", PORT);
  }
  static start() {
    Server.loadExpress();
    Server.loadSocketIo();
    Server.startListening();
  }
}

Server.start();
