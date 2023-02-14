const { io } = require("socket.io-client");
// const { socket } = require("./test_connection");

//In Local service (Procom API)
// socket.onAny((event, data) => {
//   console.log("procom event", event, data);
// });

const socket = io("ws://localhost:19019/", {
  reconnectionDelayMax: 10000,
  auth: {
    client: "remote",
  },
});

socket.on("response", (data) => {
  console.log("response", data);
});

socket.emit("request", "request data");

module.exports = {
  socket,
};
