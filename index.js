const express = require("express");
const socket = require("socket.io");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log(`Listening ${PORT} port...`);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("Socket on....", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
