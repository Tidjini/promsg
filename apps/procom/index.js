const { Logger } = require("../../logger");
const { Prosocket } = require("../common");

class Procom extends Prosocket {
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
