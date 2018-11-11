const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://ghassan:ghassan89@ds159293.mlab.com:59293/bazon-dev",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

const server = http.createServer(app);

const io = socketIo(server);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

io.on("connection", function(socket) {
  console.log("the client connected");
  io.emit("posts", { email: "ghassan@yahoo.com" });
});

server.listen(PORT, () => {
  console.log(`server run with port: ${PORT}`);
});
