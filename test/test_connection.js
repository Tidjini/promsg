const { io } = require("socket.io-client");

const socket = io("ws://localhost:19019/", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "123",
    username: "tidjini",
    id: "id",
  },
});

module.exports = {
  socket,
};
