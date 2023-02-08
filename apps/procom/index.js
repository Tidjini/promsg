const { Prosocket } = require("../common");
const { Logger } = require("../../logger");
class Procom extends Prosocket {
  static build(express, socketio) {
    Procom.app = express;
    Procom.io = socketio;
  }
  static onReceiveRequest(request, response) {
    //when recieving request from client
    //treat post body request as notification
    const { body: message } = request;
    if (!Boolean(message)) {
      Logger.logging("ON RECIEVE REQUEST", "EMPTY REQUEST (FAILED)");
      response.status(404).send({ result: "EMPTY REQUEST" });
      return;
    }
    Logger.logging("ON RECIEVE REQUEST", message + " (SUCCESS)");

    Procom.foreword(request, response);
  }

  static foreword(request, response) {
    //forword to local service
    const { context, data } = request.body;

    //notify with context attribute in message
    Procom.io.sockets.emit(context, JSON.stringify(data), (socket) => {
      //todo check errors in here
      if (!Boolean(socket)) {
        response.status(404).send("FOREWORDING REQUEST (FAILED)");
        Logger.logging("ON RECIEVE REQUEST", "EMPTY REQUEST (FAILED)");
        return;
      }
      response.status(200).send(JSON.stringify(data));
      Logger.logging("ON RECIEVE REQUEST", context + " (SUCCESS)");
    });
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
