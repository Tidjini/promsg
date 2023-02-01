const fs = require("fs");

//date and time auto-generated
//user is givin or undefined, who call the service (ip address, mac)
//context (procom-livriason)
//function (avoir le total de tel produit (br) de 31/01/2020 a 31/01/2031)
//results (fonction traitement correct ou pas) interception .. foreword .. get result .. send result success | failed ..

const content = `01/02/2023 : 11:42 |   Tidjini |   PROCOM-LIVRAISON    |   Avoir total de BR de 31/01/2020 à 31/01/2031    |   SEND RESULTS SUCCESS\n`;

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
