//sever part

const PORT = 8700;
const http = require("http");
const app = require("express")();
const server = http.createServer(app);

const server_io = require("socket.io");
const server_socketio = server_io(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen(PORT);
const bodyParser = require("body-parser");
// Add headers before the routes are defined
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//vps socket client
const { io } = require("socket.io-client");
const vps_client = io("ws://vps.groupeamry.com:19019", {
  reconnectionDelayMax: 10000,
  auth: {
    client: "vps client",
  },
});
vps_client.on("connect", () => {
  console.log(vps_client.id); // "G5p5..."
});

vps_client.on("request", (data) => {
  console.log("request", data);
  //forewording to local service with server_socketio
  server_socketio && server_socketio.emit("request", data);
});

server_socketio.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("response", (data) => {
    console.log("response", data);
    vps_client && vps_client.emit("response", data);
  });
});

//client part
