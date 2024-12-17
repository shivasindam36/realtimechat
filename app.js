const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { Socket } = require("dgram");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {




    // Listen for the 'chat message' event from clients
    socket.on('username', (username) => {
      // Broadcast the message to all clients except the sender
      socket.broadcast.emit('username', username);
  });



    socket.on("user-message", (message) => {
      // Broadcast the message to all clients except the sender
      socket.broadcast.emit("message", message);
  });
  console.log(`User connected with ID: ${socket.id}`);
})

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server Started at PORT:${port}`));