const { socket } = require("./test_connection");

//In Local service (Procom API)
socket.on("procom-request", (request) => {
  console.log("procom event", request);
});

//For Remote service (Django or React)
socket.on("procom-response", (response) => {
  console.log("procom event", response);
});

//For Remote service (Django or React)
socket.on("hi", (response) => {
  console.log("procom event", response);
});

socket.on("hi", (socket) => {
  console.log("socket----", socket);
  console.log("socket----", socket);
  console.log("socket----", socket);
  console.log("socket----", socket);
  console.log("socket----", socket);
});
socket.on("procom-request", (socket) => {
  console.log("socket----", socket);
  console.log("socket----", socket.id);
  console.log("socket----", socket.id);
  console.log("socket----", socket.id);
  console.log("socket----", socket.id);
});

module.exports = {
  socket,
};
