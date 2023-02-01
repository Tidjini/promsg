const PORT = process.env.PORT || 7777;
const { Logger } = require("../logger");

class Server {
  express;
  expServer;
  expressApp;
  socketio;
  connections = [];

  static loadExpress() {
    //initialize express
    Server.express = require("express");
    const http = require("http");
    Server.expressApp = Server.express();
    Server.expServer = http.createServer(Server.expressApp);

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
    Server.socketio = io(Server.expServer);
    Logger.log({
      username: "THIS",
      context: "[SERVER]",
      verb: "SOCKET.IO",
      result: "INITIALISATION SUCCESS",
    });
  }
  static startListening() {
    Server.expServer.listen(PORT);
    Logger.log({
      username: "THIS",
      context: "[SERVER]",
      verb: `LISTENING:${PORT}`,
      result: "LISTENING ...",
    });
  }

  static setBodyParser() {
    const bodyParser = require("body-parser");
    Server.expressApp.use(Server.express.json());
    Server.expressApp.use(bodyParser.urlencoded({ extended: true }));
    Server.expressApp.use(bodyParser.json());
    Server.expressApp.use(bodyParser.raw());
    Logger.log({
      username: "THIS",
      context: "[SERVER]",
      verb: `BODY-PARSER`,
      result: "INITIALISATION SUCCESS",
    });
  }

  static start() {
    Server.loadExpress();
    Server.loadSocketIo();
    Server.startListening();
    Server.setBodyParser();
  }
}

Server.start();
