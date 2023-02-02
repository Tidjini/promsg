const { io } = require("socket.io-client");

const socket = io("ws://localhost:7777/", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "123",
    username: "tidjini",
  },
});
