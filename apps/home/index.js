const { Logger } = require("../../logger");

function index(request, response) {
  response.sendFile(__dirname + "/index.html", (err) => {
    if (err) {
      response.send(err.toString());
      Logger.log({
        username: "THIS",
        context: "[HOME]",
        verb: "INDEX",
        result: `PAGE SENDED FAILD\n${err}\n`,
      });
      return;
    }

    Logger.log({
      username: "THIS",
      context: "[HOME]",
      verb: "INDEX",
      result: "PAGE SENDED SUCCESS",
    });
  });
}

module.exports = {
  index,
};
