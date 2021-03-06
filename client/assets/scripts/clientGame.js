// set-up a connection between the client and the server
const socket = io({transports: ['websocket'], upgrade: false})
const $username = document.querySelector('.username')
const $usernameValue = $username.querySelector('.value')
const $role = document.querySelector('.role')
const $roleValue = $role.querySelector('.value')
let myRoom = ''
let myUsername = ''
let myRole = ''
let myDifficulty = ''

socket.emit('room')

/**
 * Malus
 */
const $bother = document.querySelector('.bother')
const $botherControls = $bother.querySelector('.controls')
const $buttons = $bother.querySelectorAll("button")
const $malus = $bother.querySelector('.malus')

const defineRole = () => {
    if(myRole === 'beater') {
        $botherControls.style = 'display: none;'
    } else {
        $botherControls.style = 'display: block;'
    }
    $usernameValue.textContent = myUsername
    $roleValue.textContent = myRole
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
        }
        cooldown()
        cooldownInterval = window.setInterval(cooldown, 1000)

        // Set an anticheat on the malus buttons
        const antiCheat = () => {
            if(button.disabled === false && cooldownTimer > 0)
                button.disabled = true
        }
        window.setInterval(antiCheat, 500)

        // Send the malus information to the server
        socket.emit('malus', malus, myRoom)
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
    }
    console.log('malus')
})

/**
 * Score
 */
// The beater send his score to the server and the bother update it
window.setInterval(function () { if (myRole === 'beater') {socket.emit('updateScore', score)} }, 100)
socket.on('updateScore', (updateScore) => {
    if (myRole === 'bother') {
        score = updateScore
    }
})

/**
 * Particles
 */
socket.on('particles', (noteY, noteColor) => {
    createParticles(noteY, noteColor)
})

/**
 * Messages
 */
socket.on('connect', () => {
    console.log('user connected')
})

// Received from server qhen the client create the room
socket.on('created', (room, name, difficulty) => {
    myUsername = name
    myRoom = room
    myRole = 'beater'
    myDifficulty = difficulty
    defineRole()
})

// Received from server when the client join the room
socket.on('joined', (room, name, difficulty) => {
    myUsername = name
    myRoom = room
    myRole = 'bother'
    myDifficulty = difficulty
    defineRole()
})

/**
 * Ready
 */

// Launch the game when 2 clients are in the room
socket.on('ready', () => {
    musicNumber = myDifficulty
    launchGame()
})


/**
 * Error
 */
// When the client get an error from the server
socket.on('err', (errorMessage) => {
    window.alert('Error message : ' + errorMessage) // Write the error message
    location.href = '/' // Return to the connection page
})

/**
 * Leave the room
 */
// When the client leave the room
 window.addEventListener('beforeunload', () => {
    socket.emit('leaveRoom', myRoom, myUsername)
})