require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');
const socketIO = require("socket.io");
const moment = require("moment");
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const io = socketIO(server);
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const port = process.env.PORT || 3000

mongoose.connect(process.env.DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("connected to database"));

module.exports = app;
io.on("connection", async(socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("h:mm A")
    });
  });
})

app.use(cors());
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use("/", require("./routes/chat"))



server.listen(port, () => console.log(`server is running ${port}`));