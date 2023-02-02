const { Server } = require("./server");
const { index, Procom } = require("./apps");
const { Socket } = require("socket.io");

Server.start();

Procom.onDisconnected();
Server.app.get("/", index);
