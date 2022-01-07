const path = require("path")
const express = require('express')
const http = require('http')
const cors = require('cors')
const socketio = require("socket.io")
require('dotenv').config()

const app = express()
const server = http.createServer(app)
server.listen(process.env.PORT)
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let track = 0

app.use((req, res, next) => {
  if(req.path === '/mbo/start' && req.body.pass === process.env.PASS) {
    // standby = true
    io.sockets.emit('message', 'play')
    res.send('ok')
    return
  }
  res.sendFile(path.join(__dirname, "..", "build", "index.html"))
})

io.on('connection', socket => {
  console.log('user connected to track', track)
  io.sockets.emit('track', track + 1)
  track = ++track % 6
})

io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`)
})
