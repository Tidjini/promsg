const PORT = process.env.PORT || 7777;
const { Logger } = require("../logger");

class Server {
  express;
  socketio;
  connections = [];

  static loadExpress() {
    //initialize express
    const express = require("express");
    const http = require("http");
    const expressApp = express();
    Server.express = http.createServer(expressApp);

    Logger.log({
      username: "THIS",
      context: "[SERVER]",
      verb: "EXPRESS",
      result: "INITIALISATION SUCCESS",
    });
  }

  static loadSocketIo() {
    //init with socket.io
    const io = require("socket.io");
    Server.socketio = io(Server.express);
    Logger.log({
      username: "THIS",
      context: "[SERVER]",
      verb: "SOCKET.IO",
      result: "INITIALISATION SUCCESS",
    });
  }
  static startListening() {
    Server.express.listen(PORT);
    Logger.log({
      username: "THIS",
      context: "[SERVER]",
      verb: `START LISTENING:${PORT}`,
      result: "LISTENING ...",
    });
  }
  static start() {
    Server.loadExpress();
    Server.loadSocketIo();
    Server.startListening();
  }
}

Server.start();
