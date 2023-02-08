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
      Logger.log("ON RECIEVE REQUEST", "EMPTY REQUEST (FAILED)");
      response.status(404).send({ result: "EMPTY REQUEST" });
      return;
    }
    Logger.log("ON RECIEVE REQUEST", message + " (SUCCESS)");
    //send loading as response
    response.status(404).send({ result: "Wait for treatment..." });
  }

  static onForewording(request, response) {
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
