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

let loading = false;

socket.on("response", (data) => {
  loading = false;
  console.log("response", data);
});

setInterval(() => {
  socket.emit("request", "request data", (value) => {
    console.log("server ACK ", value);
  });
}, 5 * 1000);

module.exports = {
  socket,
};
