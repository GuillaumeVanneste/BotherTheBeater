// set-up a connection between the client and the server
const socket = io({transports: ['websocket'], upgrade: false})
let isReady = false
let myRoom = ''
let myUsername = ''
let player = ''

socket.emit('room')

window.addEventListener('beforeunload', () => {
    socket.emit('leaveRoom', myRoom, myUsername)
})

/**
 * Malus
 */
const $player2Controls = document.querySelector('.player2.controls')
const $malus = document.querySelector('.malus')
const $buttons = $malus.querySelectorAll("button")

const definePlayer = () => {
    if(player === 'player1') {
        $player2Controls.style = 'display: none;'
    } else {
        $player2Controls.style = 'display: block;'
    }
}

// For each button of $buttons
for (let i = 0; i < $buttons.length; i++) {
    const button = $buttons[i]
    let malus = ""
    let cooldownTimer = null
    let cooldownInterval = null
    let antiCheatInterval = null
    // Player send a malus
    button.addEventListener("mouseup", () => {
        malus = button.value
        button.disabled = true
        cooldownTimer = 5 * (i + 2)
        window.setTimeout(function () {button.disabled = false}, cooldownTimer * 1000) // Set a cooldown of each malus

        // cooldown timer
        const cooldown = () => {
            if(cooldownTimer > 0) {
                button.innerHTML = cooldownTimer
                cooldownTimer--
            } else {
                button.innerHTML = button.value
                window.clearInterval(cooldownInterval)
            }
            console.log(cooldownInterval)
        }
        cooldown()
        cooldownInterval = window.setInterval(cooldown, 1000)

        const antiCheat = () => {
            if(button.disabled === false && cooldownTimer > 0) {
                button.disabled = true
                console.log('YOU ARE CHEATING !')
            } else {
                console.log('You\'re not cheating')
            }
        }
        window.setInterval(antiCheat, 500)

        // Send the malus information to the server
        socket.emit('malus', malus)
    })
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
        case 'rotate':
            angle += 90
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
    myUsername = name
    myRoom = room
    player = 'player1'
    definePlayer()
})

// Received a message qhen the client join the room
socket.on('joined', (room, name) => {
    console.log('you\'ve joined the room ' + room + ' as user ' + name)
    myUsername = name
    myRoom = room
    player = 'player2'
    definePlayer()
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