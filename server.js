const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketIO = require('socket.io')
const cors = require('cors')
const path=require('path')
const {addUser,getUser,getUserInRoom,removeUser}=require('./user')
app.options('*', cors())
const PORT=process.env.PORT || 5000
const io = socketIO(server, { cors: { origin: '*', methods: ['GET', 'POST'] } })
if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
io.on('connection', (socket) => {
    console.log('New Socket')
    socket.on('join', ({ name, room },callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error)
            callback(error)
        socket.join(user.room)
        socket.emit('message', { user: 'Admin', text: `${user.name} Wel-Come to Room` })
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined room`})
        callback()
    })
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })
        callback()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user)
        {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} left the chat` })
        }
        
    })
})
server.listen(PORT,()=>{console.log('server started')})