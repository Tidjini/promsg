const PORT = process.env.PORT || 7777;
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
    // Server.app.use(function (req, res, next) {
    //   // Website you wish to allow to connect
    //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    //   // Request methods you wish to allow
    //   res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    //   );

    //   // Request headers you wish to allow
    //   res.setHeader(
    //     "Access-Control-Allow-Headers",
    //     "X-Requested-With,content-type"
    //   );

    //   // Set to true if you need the website to include cookies in the requests sent
    //   // to the API (e.g. in case you use sessions)
    //   res.setHeader("Access-Control-Allow-Credentials", true);

    //   // Pass to next layer of middleware
    //   next();
    // });
    Server.app.use(bodyParser.urlencoded({ extended: true }));
    Server.app.use(bodyParser.json());
    Server.app.use(bodyParser.raw());

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
