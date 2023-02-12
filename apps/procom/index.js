const { Prosocket } = require("../common");
const { Logger } = require("../../logger");

const events = {
  receive_request: "request",
  receive_response: "response",
};

class Procom extends Prosocket {
  static build(express, socketio) {
    Procom.app = express;
    Procom.io = socketio;
  }

  static onConnection(socket) {
    Prosocket.onConnection(socket);
    Procom.onReceiveRequest(socket);
    Procom.onReceiveResponse(socket);
  }

  static onReceiveRequest(socket) {
    socket.on(events["receive_request"], (request) => {
      console.log(request);
      if (!Boolean(request)) {
        Logger.logging("ON RECIEVE REQUEST", "EMPTY REQUEST (FAILED)");
        socket.emit("REQUEST EMPTY", { failure: "EMPTY REQUEST", status: 404 });
        return;
      }
      Logger.logging("ON RECIEVE REQUEST", request + " (SUCCESS)");
      // Procom.foreword(request, response);
    });
  }

  static onReceiveResponse(socket) {
    socket.on(events["receive_response"], (response) => {
      console.log(response);
      if (!Boolean(response)) {
        Logger.logging("ON RECIEVE RESPONSE", "EMPTY RESPONSE (FAILED)");
        response.status(404).send({ failure: "EMPTY RESPONSE" });
        socket.emit("RESPONSE EMPTY", {
          failure: "EMPTY RESPONSE",
          status: 404,
        });
        //todo set failure message
      }
      Logger.logging("ON RECIEVE RESPONSE", response + " (SUCCESS)");
      //send response to other context and listener channel
      // Procom.foreword(request, response);
    });
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
