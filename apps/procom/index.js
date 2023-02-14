const { Prosocket } = require("../common");
const { Logger } = require("../../logger");
const { socket } = require("../../test/test_connection");

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
    console.log("connected", socket.handshake.auth);
    socket.on("request", (data) => {
      console.log("request", data);
      socket.broadcast.emit("request", data);
    });
    socket.on("response", (data) => {
      console.log("response", data);
      socket.broadcast.emit("response", data);
    });
    // socket.onAny((event, data) => {
    //   console.log("Procom.io.sockets.onAny ", event, data);
    // });
    // socket.on("request", (data) => {
    //   console.log("socket.on.request [emit]", data.socket);
    //   socket.emit("request-", data.socket);
    // });
    // Prosocket.connections.forEach((socket) => {
    // Procom.onReceiveRequest(socket);
    // Procom.onReceiveResponse(socket);
    // });
  }

  // static onReceiveRequest(request, response) {
  //   const { body: message } = request;
  //   console.log("receive_request", message);
  //   if (!Boolean(message)) {
  //     Logger.logging("ON RECIEVE REQUEST", "EMPTY REQUEST (FAILED)");
  //     response.status(404).send({ message: "empty request (no data)" });
  //     // socket.emit("REQUEST EMPTY", { failure: "EMPTY REQUEST", status: 404 });
  //     return;
  //   }
  //   Logger.logging("ON RECIEVE REQUEST", request + " (SUCCESS)");
  //   response.status(200).send({ message: "Request Forwording" });

  //   socket.emit(events["receive_request"], request);
  // }

  static onReceiveRequest() {
    // Procom.io.sockets.on("request", (data) => {
    console.log("handle this data");
    // });
  }

  static onReceiveResponse(socket) {
    socket.on(events["receive_response"], (response) => {
      console.log("receive_response", response);
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
