const { Logger } = require("../../logger");

class Procom {
  static connections = [];

  static onConnection(socket) {
    /**onConnect on connect to this end point
     *
     * socket with id of connected client
     */
    Procom.connections.push(socket);

    Logger.log({
      username: socket && socket.id,
      context: "[PROCOM]",
      verb: "USER-CONNECTION",
      result: `CONNECTION SUCCESS`,
    });

    socket && socket.on("disconnect", Procom.onDisconnected);
  }

  static onDisconnected(socket) {
    const index = Procom.connections.indexOf(socket);
    Procom.connections.splice(index, 1);
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
