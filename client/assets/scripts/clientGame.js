// set-up a connection between the client and the server
const socket = io({transports: ['websocket'], upgrade: false})
let isReady = false
const room = window.location.pathname.slice(1)


socket.emit('room', room)

window.addEventListener('beforeunload', () => {
    socket.emit('leaveRoom', room)
})

/**
 * Malus
 */
const $malus = document.querySelector('.malus')
const $buttons = $malus.querySelectorAll("button")
let malus = ""

// For each button of $buttons
for (let i = 0; i < $buttons.length; i++) {
    const button = $buttons[i]
    // Player send a malus
    button.addEventListener("mousedown", () => {
        malus = button.value
        button.disabled = true
        window.setTimeout(function () {button.disabled = false}, 5000 * (i + 2)) // Set a cooldown of each malus

        // cooldown timer


        // Send the malus information to the server
        socket.emit('malus', malus)
    });
}

// Define the malus received from the server
socket.on('malus', (malus) => {
    switch(malus){
        //malus 1 -> Reduce the gamma of the screen
        case 'gamma':
            const $gamma = document.createElement('div')
            $gamma.classList.add('gamma')
            $malus.appendChild($gamma)
            window.setTimeout(function () {$malus.removeChild($gamma)}, 5000) // Remove the malus
            break

        //malus 2 -> change the position of bubbles
        case 'switch':
            context.rotate(90 * (Math.PI / 180))
            break

        //malus 3 -> increase the speed of the music
        case 'speed':
            timerSpeed = 5
            break
    }
})

/**
 * Messages
 */
socket.on('connect', () => {
    console.log('user connected')
})

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
    location.href = '/' // Return to the connection page
})