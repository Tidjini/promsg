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
      response.status(404).send({ failure: "EMPTY REQUEST" });
      return;
    }
    Logger.logging("ON RECIEVE REQUEST", message + " (SUCCESS)");
    Procom.foreword(request, response);
  }

  static onReceiveResponse(request, response) {
    //when recieving reponse from local service (like PROCOM)
    //treat post body request as notification
    const message = request.body;
    if (!Boolean(message)) {
      Logger.logging("ON RECIEVE RESPONSE", "EMPTY RESPONSE (FAILED)");
      response.status(404).send({ failure: "EMPTY RESPONSE" });
      //todo set failure message
      message = "Failure Message";
      request.body["data"] = message;
    }
    Logger.logging("ON RECIEVE REQUEST", message + " (SUCCESS)");
    //send response to other context and listener channel
    Procom.foreword(request, response);
  }

  static foreword(request, response) {
    //forword to local service
    const { context, data } = request.body;
    //notify with context attribute in message
    Procom.io.sockets.emit(context, JSON.stringify(data), (socket) => {
      //todo check errors in here
      if (!Boolean(socket)) {
        response.status(404).send({ failure: "FOREWORDING REQUEST (FAILED)" });
        Logger.logging("ON RECIEVE REQUEST", "EMPTY REQUEST (FAILED)");
        return;
      }
      //waiting for response
      response
        .status(200)
        .send({ success: "RESPONSE FOREWORDED WITH SUCCESS" });
      Logger.logging("ON RECIEVE REQUEST", context + " (SUCCESS)");
    });
  }
}

module.exports = {
  Procom,
};
