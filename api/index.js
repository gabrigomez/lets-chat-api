const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://letschatoficial.netlify.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User: ${socket.id} `);

  socket.on("enter_room", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} entered: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);    
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  })
})

server.listen(3001, () => {
  console.log("Server is running");
})