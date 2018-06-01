const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const {isRealString} = require('./utilities/validation')
const currentRooms = []
let name = null
let room = null

app.use(express.static(__dirname + '/client/'))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})

app.post('/submit', (req, res) => {
    name = req.body.name
    room = req.body.room
    if(room === '') {
        res.redirect('/')
    } else {
        res.redirect(room)
    }
})

app.get('/:room', (req, res) => {
    res.sendFile(__dirname + '/client/game.html')
})


server.listen(2000)

const io = require('socket.io')(server,{})

// Interactions between sockets and server
io.sockets.on('connection', (socket) => {

    // Once a client has connected, he join a room
    socket.on('room', (room) => {

        // If client forget to refer a name or a room
        if (!isRealString(name)) {
            socket.emit('err', 'Username is missing !') // Send an error to the client
            return false // Close the session
        } else if(!isRealString(room)) {
            socket.emit('err', 'Room name is missing !') // Send an error to the client
            return false // Close the session
        }

        // Check how many people are in a room
        const clientsInRoom = io.nsps['/'].adapter.rooms[room] // Array of all clients in the room
        const numClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length // Count number of clients
        switch (numClients) {
            case 0: // first client -> create the room
                socket.join(room) // Client join the room
                if(!currentRooms.includes(room))
                    currentRooms.push(room)
                socket.emit('created', room, name)
                break
            case 1: // Seco²nd client -> join the room
                socket.join(room) // Client join the room
                socket.in(room).broadcast.emit('join', name) // Send message to the client already in the room
                socket.emit('joined', room, name) // Send message to the client who joined
                io.sockets.in(room).emit('ready') // Send a ready message to all clients of the room
                break
            case 2: // Already 2 clients in the room -> the room is full
                socket.emit('err', 'The room ' + room + ' is full') // Send an error to the client
                break
        }

        // Emit the malus to the other player in the same romm
        socket.on('malus', (room, malus) => {
            socket.in(room).broadcast.emit('malus', malus)
            socket.in(room).emit('message', 'You got a malus !')
        })

        socket.on('leaveRoom', (room) => {
            if(numClients === 0)
                currentRooms.splice(currentRooms.indexOf(room), 1)
        })
    })

    socket.on('askBrowser', () => {
        socket.emit('updateBrowser', (currentRooms))
    })

    socket.emit('updateBrowser', (currentRooms))

    // Lose socket connection
    socket.on('disconnect', () => {
        console.log("user disconnected")
    })
})
