const fs = require("fs");

const RESULTS = {
  INTERCEPTION: "INTERCEPTION",
  FOREWORDING: "FOREWORDING",
  GET_RESULTS: "GET RESULTS",
  SEND_RESULTS: "SEND RESULTS",
};
const EXCEPTION_PREFIX = "Exception, due to ";
const LOG_DEFAULT_FILENAME = "changes.log";
//TODO LOGGER LOCATION DIRECTORY
class Logger {
  //data to consume
  //date and time auto-generated
  //user is givin or undefined, who call the service (ip address, mac)
  //context (procom-livriason)
  //function (avoir le total de tel produit (br) de 31/01/2020 a 31/01/2031)
  //results (fonction traitement correct ou pas) interception .. foreword .. get result .. send result success | failed ..

  static buid(data) {
    const {
      username,
      context,
      verb,
      result,
      filename: otherFilename,
    } = data || {};

    Logger.date = new Date(Date.now());
    Logger.filename = otherFilename || LOG_DEFAULT_FILENAME;
    Logger.content = `${Logger.date.toLocaleString()} | ${username} | ${context}  | ${verb}  | `;

    //todo later build real results
    Logger.content += result || `${RESULTS.INTERCEPTION}`;
    Logger.content += "\n";
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
  static log(verb, message) {
    Logger.buid({
      username: "THIS",
      context: "[Message]",
      verb: verb,
      result: message,
    });

    fs.appendFile(Logger.filename, Logger.content, (error) => {
      if (error) {
        Logger.onLogFailed(error);
        return;
      }
      Logger.onLogSuccess();
    });
  }

  static onLogSuccess() {
    // console.log("test passed with success (file writing)");
  }
  static onLogFailed(error) {
    console.log(EXCEPTION_PREFIX, error);
  }
}

//Todo test
// Logger.log({
//   username: "Tidjin",
//   context: "[CONTEXT]",
//   verb: "GET LIST OF SAMPLES PRODUCT",
// });
module.exports = {
  Logger,
};
