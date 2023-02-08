const PORT = process.env.PORT || 19019;
const { Logger } = require("../logger");

class Server {
  express;
  server;
  app;
  static socketio;

  static loadExpress() {
    //initialize express
    Server.express = require("express");
    const http = require("http");
    Server.app = Server.express();
    Server.server = http.createServer(Server.app);

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
    Server.socketio = io(Server.server, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });
    Logger.log({
      username: "THIS",
      context: "[SERVER]",
      verb: "SOCKET.IO",
      result: "INITIALISATION SUCCESS",
    });
  }
  static startListening() {
    Server.server.listen(PORT);
    Logger.log({
      username: "THIS",
      context: "[SERVER]",
      verb: `LISTENING:${PORT}`,
      result: "LISTENING ...",
    });
  }

  static setBodyParser() {
    const bodyParser = require("body-parser");
    Server.app.use(Server.express.json());
    // Add headers before the routes are defined
    Server.app.use(bodyParser.urlencoded({ extended: true }));
    Server.app.use(bodyParser.json());
    Server.app.use(bodyParser.raw());
    // Add headers before the routes are defined
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

module.exports = {
  Server,
};
