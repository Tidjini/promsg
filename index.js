const { Server } = require("./server");
const { index, Message, Procom, Prosocket } = require("./apps");

Server.start();
const io = Server.socketio;
Message.build(Server.app, io);
Procom.build(Server.app, io);

//todo later not just for messaging onConnection of global context
io.sockets.on("connection", Message.onConnection);
io.sockets.on("connection", Procom.onConnection);

//catch post data in message to send it to connected users
Server.app.post("/message", Message.onRecieve);
Server.app.post("/procom/livraison/request", Procom.onReceiveRequest);
Server.app.post("/procom/livraison/response", Procom.onReceiveResponse);
//serve index
Server.app.get("/", index);
