const { Server } = require("./server");
const { index, Procom } = require("./apps");

Server.start();
Server.app.get("/", index);

const io = Server.socketio;
io.sockets.on("connection", Procom.onConnection);
