const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
require("dotenv").config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin:"http://localhost:3000",
  }
});

require("./utils/io")(io);
httpServer.listen(5000, () => {
  console.log("server is running");
});
