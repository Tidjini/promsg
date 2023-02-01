const fs = require("fs");

const RESULTS = {
  INTERCEPTION: "INTERCEPTION",
  FOREWORDING: "FOREWORDING",
  GET_RESULTS: "GET RESULTS",
  SEND_RESULTS: "SEND RESULTS",
};
const EXCEPTION_PREFIX = "Exception, due to ";

class Logger {
  date = new Date(Date.now());
  filename = "Changelog";
  content = "";
  constructor(data) {
    const { username, context, verb, filename } = data || {};
    this.filename = filename || this.filename;
    this.content = `${this.date.toLocaleString()} | ${username} | ${context}  | ${verb}  | `;

    this.buildResult = this.buildResult.bind(this);
    this.log = this.log.bind(this);
    this.onLogSuccess = this.onLogSuccess.bind(this);
    this.onLogFailed = this.onLogFailed.bind(this);
  }

  buildResult(result) {
    this.content += `${RESULTS.INTERCEPTION} SUCCESS\n`;
    return this.content;
  }

  log(result) {
    this.content = this.buildResult(result);
    fs.appendFile(this.filename, this.content, (error) => {
      if (error) {
        this.onLogFailed(error);
        return;
      }
      this.onLogSuccess();
    });
  }

  onLogSuccess() {
    console.log("test passed with success (file writing)");
  }
  onLogFailed(error) {
    console.log(EXCEPTION_PREFIX, error);
  }
}

//date and time auto-generated
//user is givin or undefined, who call the service (ip address, mac)
//context (procom-livriason)
//function (avoir le total de tel produit (br) de 31/01/2020 a 31/01/2031)
//results (fonction traitement correct ou pas) interception .. foreword .. get result .. send result success | failed ..

new Logger({
  username: "Tidjin",
  context: "[CONTEXT]",
  verb: "GET LIST OF SAMPLES PRODUCT",
}).log();
