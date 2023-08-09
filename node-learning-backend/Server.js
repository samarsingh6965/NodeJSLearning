// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Router/Router')
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
// db connection
require('./Database/Db')

app.use('/api', router)


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    console.log(msg)
    io.emit('message', msg)
  })
});
server.listen(5000, () => {
  console.log('listening on *:5000');
});
