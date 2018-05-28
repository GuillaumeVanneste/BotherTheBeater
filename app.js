const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
let name = ""
let room = ""

app.use(express.static(__dirname + '/client/'))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})

app.post('/submit', (req, res) => {
    name = req.body.name
    room = req.body.room
    res.redirect(room)
})

app.get('/:room', (req, res) => {
	res.sendFile(__dirname + '/client/game.html')
})


server.listen(2000)

const io = require('socket.io')(server,{

})

console.log('server is up')
