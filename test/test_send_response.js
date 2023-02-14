const { io } = require("socket.io-client");

// const { socket } = require("./test_connection");

//In Local service (Procom API)
// socket.onAny((event, data) => {
//   console.log("procom event", event, data);
// });

const socket = io("ws://localhost:19019/", {
  reconnectionDelayMax: 10000,
  auth: {
    client: "local service",
  },
});

socket.on("request", (data) => {
  console.log("request", data);
  socket.emit("response", {
    username: "CHAFFIK",
    password: "170189",
  });
});

module.exports = {
  socket,
};
