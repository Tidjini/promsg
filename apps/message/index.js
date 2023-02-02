const { Prosocket } = require("../common");
const { Logger } = require("../../logger");

class Message extends Prosocket {
  //this message need both express application
  //and socketio to push and recieve messages and notifications

  static build(express, socketio) {
    Message.app = express;
    Message.io = socketio;
  }

  static onRecieve(request, response) {
    //treat post body request as notification
    const { body: message } = request;

    if (!Boolean(message)) {
      Logger.log({
        username: "THIS",
        context: "[Message]",
        verb: "RECIEVE DATA",
        result: `MESSAGE EMPTY`,
      });
      return;
    }
    Logger.log({
      username: "THIS",
      context: "[Message]",
      verb: "RECIEVE DATA",
      result: `MESSAGE SUCCESS`,
    });

    Message.handleMessage(message, response);
  }

  static handleMessage(message, response) {
    Message.push(message);
    Message.sendResponse(response);
  }

  static push(message) {
    //push message for specific context (event-listeners)
    const { context, data } = message;

    //notify with context attribute in message
    Message.io.sockets.emit(context, JSON.stringify(data), (response) => {
      //todo check errors in here
      console.log(response.status);
      Logger.log({
        username: "THIS",
        context: `[Message-${context}]`,
        verb: "PUSH DATA",
        result: `MESSAGE SUCCESS`,
      });
    });
  }

  static sendResponse(response) {
    //return the response to http client
    response.send(JSON.stringify(notification), (err) => {
      if (err) {
        response.send(err.toString());
        Logger.log({
          username: "THIS",
          context: "[Message]",
          verb: "RESPONSE",
          result: `RESPONSE SENDED FAILD\n${err}`,
        });
        return;
      }

      Logger.log({
        username: "THIS",
        context: "[MESSAGE]",
        verb: "RESPONSE",
        result: "RESPONSE SENDED SUCCESS",
      });
    });
  }
}

module.exports = {
  Message,
};
