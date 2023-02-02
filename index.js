const { Server } = require("./server");
const { index, Procom, Message } = require("./apps");

Server.start();
Message.build(Server.app, Server.socketio);

Server.app.get("/", index);

const io = Server.socketio;
io.sockets.on("connection", Procom.onConnection);
