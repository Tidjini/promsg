const { socket } = require("./test_connection");

//In Local service (Procom API)
socket.onAny((event, data) => {
  console.log("procom event", event, data);
});

socket.emit("request", {
  username: "CHAFFIK",
  password: "170189",
  socket: socket.id,
});

module.exports = {
  socket,
};
