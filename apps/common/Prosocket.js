const { Logger } = require("../../logger");

class Prosocket {
  static auth(handshake) {
    //todo later set authentication process to this service
    const { auth, query } = handshake;
  }
  static connections = [];

  static register(socket) {
    Prosocket.connections.push(socket);
  }
  static unregister(socket) {
    const index = Prosocket.connections.indexOf(socket);
    Prosocket.connections.splice(index, 1);
  }
  static onConnection(socket) {
    /**onConnect on connect to this end point
     *
     * socket with id of connected client
     */
    //if there is no socket in here log issue and return
    if (!Boolean(socket)) {
      //todo later set this with real error.logs
      Logger.log({
        username: "SOCKET NONE",
        context: "[Prosocket]",
        verb: "USER-CONNECTION",
        result: `CONNECTION FAILED SOCKET IS NONE`,
      });
      return;
    }

    Prosocket.auth(socket.handshake);
    Prosocket.register(socket);

    Logger.log({
      username: socket && socket.id,
      context: "[Prosocket]",
      verb: "USER-CONNECTION",
      result: `CONNECTION SUCCESS`,
    });

    socket && socket.on("disconnect", Prosocket.onDisconnected);
  }

  static onDisconnected(socket) {
    Prosocket.unregister(socket);
    Logger.log({
      username: socket && socket.id,
      context: "[Prosocket]",
      verb: "USER-DISCONNECTED",
      result: `DISCONNECTED SUCCESS`,
    });
  }
}

module.exports = {
  Prosocket,
};
