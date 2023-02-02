const { Logger } = require("../../logger");

class Procom {
  static connections = [];

  static auth(handshake) {
    //todo later set authentication process to this service
    const { auth, query } = handshake;
    console.log(auth);
    console.log(query);
  }

  static register(socket) {
    Procom.connections.push(socket);
  }
  static unregister(socket) {
    const index = Procom.connections.indexOf(socket);
    Procom.connections.splice(index, 1);
  }
  static onConnection(socket) {
    /**onConnect on connect to this end point
     *
     * socket with id of connected client
     */
    //if there is no socket in here log issue and return
    if (!Boolean(socket)) {
      Logger.log({
        username: "SOCKET NONE",
        context: "[PROCOM]",
        verb: "USER-CONNECTION",
        result: `CONNECTION FAILED SOCKET IS NONE`,
      });
      return;
    }

    Procom.auth(socket.handshake);
    Procom.register(socket);

    Logger.log({
      username: socket && socket.id,
      context: "[PROCOM]",
      verb: "USER-CONNECTION",
      result: `CONNECTION SUCCESS`,
    });

    socket && socket.on("disconnect", Procom.onDisconnected);
  }

  static onDisconnected(socket) {
    Procom.unregister(socket);
    Logger.log({
      username: socket && socket.id,
      context: "[PROCOM]",
      verb: "USER-DISCONNECTED",
      result: `DISCONNECTED SUCCESS`,
    });
  }

  static onReceiveRequest() {
    //when recieving request from client
  }

  static onForewording() {
    //on forwording
  }

  static onReceiveResponse() {
    //on Receiving Response From Local service
  }

  static onSendResponse() {
    //on Send Response To Remote client
  }
}

module.exports = {
  Procom,
};
