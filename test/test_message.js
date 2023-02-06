const { socket } = require("./test_connection");

//intercept test event
socket.on("tasks", (task) => {
  console.log("test event", task);
});
module.exports = {
  socket,
};
