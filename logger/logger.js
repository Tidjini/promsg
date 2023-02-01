const fs = require("fs");

const RESULTS = {
  INTERCEPTION: "INTERCEPTION",
  FOREWORDING: "FOREWORDING",
  GET_RESULTS: "GET RESULTS",
  SEND_RESULTS: "SEND RESULTS",
};

class Log {
  date = Date.now();
  content = "";
  constructor(username = "Unknowen", context = "GLOBAL", fun = "Unknowen") {
    this.content = `${date} | ${username} | ${context}  | ${fun}  | `;
    this.buildResult = this.buildResult.bind(this);
  }

  buildResult(result) {
    this.content += `${RESULTS.INTERCEPTION} SUCCESS\n`;
    return this.content;
  }
}

//date and time auto-generated
//user is givin or undefined, who call the service (ip address, mac)
//context (procom-livriason)
//function (avoir le total de tel produit (br) de 31/01/2020 a 31/01/2031)
//results (fonction traitement correct ou pas) interception .. foreword .. get result .. send result success | failed ..

const content = Log().buildResult();

const EXCEPTION_PREFIX = "Exception, due to ";

fs.appendFile("./test.txt", content, (error) => {
  if (error) console.log(EXCEPTION_PREFIX, error);
  else {
    console.log("test passed with success (file writing)");
  }
});

// fs.readFile("./test.txt", (err, data) => {
//   if (err) {
//     console.log(EXCEPTION_PREFIX, err);
//     return;
//   }

//   console.log(data);
// });
