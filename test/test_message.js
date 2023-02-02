const { socket } = require("./test_connection");

//intercept test event
socket.on("test", (data) => {
  console.log("test event", data);
});
module.exports = {
  socket,
};
