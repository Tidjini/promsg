const { socket } = require("./test_connection");

//In Local service (Procom API)
socket.on("procom-request", (request) => {
  console.log("procom event", request);
});

socket.on("connection", (socket) => {
  console.log("on connection", socket);
});

module.exports = {
  socket,
};
