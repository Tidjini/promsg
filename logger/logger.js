const fs = require("fs");

const RESULTS = {
  INTERCEPTION: "INTERCEPTION",
  FOREWORDING: "FOREWORDING",
  GET_RESULTS: "GET RESULTS",
  SEND_RESULTS: "SEND RESULTS",
};
const EXCEPTION_PREFIX = "Exception, due to ";

class Logger {
  static date = new Date(Date.now());
  static filename = "Changelog";
  static content = "";
  static buid(data) {
    const {
      username,
      context,
      verb,
      result,
      filename: otherFilename,
    } = data || {};
    Logger.filename = otherFilename || Logger.filename;
    Logger.content = `${Logger.date.toLocaleString()} | ${username} | ${context}  | ${verb}  | `;

    //todo later build real results
    Logger.content += `${RESULTS.INTERCEPTION} SUCCESS\n`;
  }

  static log(data) {
    Logger.buid(data);

    fs.appendFile(Logger.filename, Logger.content, (error) => {
      if (error) {
        Logger.onLogFailed(error);
        return;
      }
      Logger.onLogSuccess();
    });
  }

  static onLogSuccess() {
    console.log("test passed with success (file writing)");
  }
  static onLogFailed(error) {
    console.log(EXCEPTION_PREFIX, error);
  }
}

//date and time auto-generated
//user is givin or undefined, who call the service (ip address, mac)
//context (procom-livriason)
//function (avoir le total de tel produit (br) de 31/01/2020 a 31/01/2031)
//results (fonction traitement correct ou pas) interception .. foreword .. get result .. send result success | failed ..

Logger.log({
  username: "Tidjin",
  context: "[CONTEXT]",
  verb: "GET LIST OF SAMPLES PRODUCT",
});
