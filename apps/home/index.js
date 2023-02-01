function index(request, response) {
  response.sendFile(__dirname + "/index.html", (err) => {
    if (err) {
      console.log("EXception handling", err);
      response.send(err.toString());
    }
  });
}

module.exports = {
  index,
};
