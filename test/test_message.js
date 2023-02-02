const { socket } = require("./test_connection");

socket.on("test", (data) => {
  console.log("test event", data);
});
module.exports = {
  socket,
};
