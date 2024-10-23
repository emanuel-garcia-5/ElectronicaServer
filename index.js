const express = require('express')
require('dotenv').config();
const cors = require('cors')
const app = express()

app.use(cors({
    origin:'*'
}))
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server, {cors:{origin:'*'}})

io.on('connection', (socket) => {
    console.log('Se ha conectado un usuario')
    socket.on('arduinoData',

        (data) => {
            console.log(data)
            socket.broadcast.emit('arduino', data)
        }
    )
})

server.listen(process.env.PORT, '0.0.0.0',()=>{
    console.log('Servidor running')
})