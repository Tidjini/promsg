const { socket } = require("./test_connection");

//In Local service (Procom API)
socket.on("procom-request", (request) => {
  console.log("procom event", request);
});

//For Remote service (Django or React)
socket.on("procom-response", (response) => {
  console.log("procom event", response);
});

module.exports = {
  socket,
};
