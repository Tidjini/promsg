const { socket } = require("./test_connection");

//intercept test event
socket.on("tasks", (task) => {
  console.log("test event", task);
});

socket.on("driver-position", (drivers) => {
  console.log("driver-position", drivers);
});
module.exports = {
  socket,
};
