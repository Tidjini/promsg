const { Server } = require("./server");
const { index, Procom, Message } = require("./apps");

Server.start();
const io = Server.socketio;
Message.build(Server.app, io);
io.sockets.on("connection", Procom.onConnection);

//catch post data in message to send it to connected users
Server.app.post("/message", Message.onRecieve);
//serve index
Server.app.get("/", index);
