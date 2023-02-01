const { Server } = require("./server");
const { index } = require("./apps");

Server.start();

Server.app.get("/", index);
