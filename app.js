const express = require('express')
const app = express()
const server = require('http').Server(app)

const {isRealString} = require('./utilities/validation')

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/index.html')
})

app.use(express.static(__dirname + '/client/'))

server.listen(2000)

const io = require('socket.io')(server,{

})

console.log('server is up')
