// set-up a connection between the client and the server
const socket = io.connect()


/**
 * Messages
 */
// Received a message qhen the client create the room
socket.on('created', (room, name) => {
    console.log('you\'ve created the room ' + room + ' as user ' + name)
})

// Received a message qhen the client join the room
socket.on('joined', (room, name) => {
    console.log('you\'ve joined the room ' + room + ' as user ' + name)
})

// Received a message qhen the client join the room
socket.on('join', (name) => {
    console.log(name + ' has joined your room')
})

/**
 * Ready
 */

// Received a message qhen the client join the room
socket.on('ready', () => {
    isReady = true
    console.log('The game begins !!!')
})


/**
 * Error
 */
// When the client get an error from the server
socket.on('err', (errorMessage) => {
    window.alert('Error message : ' + errorMessage) // Write the error message
    location.href = 'index.html' // Return to the connection page
})