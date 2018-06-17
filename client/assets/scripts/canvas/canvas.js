// Set-up canvas
const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')
const $score = document.querySelector('.score')
const $scoreValue = $score.querySelector('.value')
const $restartPopup = document.querySelector('.restartPopup')
const $restartButton = $restartPopup.querySelector('.restartButton')
const center = {x: $canvas.width * 0.5, y: $canvas.height * 0.5} // Center of canvas
let angle = 0

// VARIABLES
const color1 = '#00ff00'
const color2 = '#ff0000'
const color3 = '#ffff00'
const color4 = '#0000ff'
const color5 = '#ff7000'
const globalRadius = 25
const endRadius = 35
const timeTravel = 0.75
let musicNumber = 0
let notes = []
let score = 0
let perfect = 0
let tooSoon = 0
let tooLate = 0
let missed = 0
let timerSpeed = 10
const $audio = document.querySelector('audio')

const musics = [
    [
        [color1, 2.46],
        [color2, 3.03],
        [color3, 3.50],
        [color1, 4.37],
        [color2, 4.87],
        [color3, 5.37],
        [color2, 5.67],
        [color1, 6.77],
        [color2, 7.27],
        [color3, 7.80],
        [color2, 8.64],
        [color1, 9.17],
        [color1, 11.07],
        [color2, 11.61],
        [color3, 12.11],
        [color1, 12.98],
        [color2, 13.51],
        [color3, 14.01],
        [color2, 14.31],
        [color1, 15.41],
        [color2, 15.94],
        [color3, 16.48],
        [color2, 17.31],
        [color1, 17.85],
        [color1, 19.75],
        [color2, 20.28],
        [color3, 20.85],
        [color1, 21.65],
        [color2, 22.18],
        [color3, 22.68],
        [color2, 22.98],
        [color1, 24.09],
        [color2, 24.62],
        [color3, 25.15],
        [color2, 25.92],
        [color1, 26.52],
        [color1, 28.39],
        [color2, 28.89],
        [color3, 29.42],
        [color1, 30.23],
        [color2, 30.76],
        [color3, 31.26],
        [color2, 31.56],
        [color1, 32.59],
        [color2, 33.16],
        [color3, 33.66],
        [color2, 34.46],
        [color1, 35.00],
        [color1, 36.83],
        [color2, 37.37],
        [color3, 37.90],
        [color1, 38.70],
        [color2, 39.23],
        [color3, 39.74],
        [color2, 40.04],
        [color1, 41.10],
        [color2, 41.64],
        [color3, 42.14],
        [color2, 42.94],
        [color1, 43.44],
        [color1, 45.31],
        [color2, 45.84],
        [color3, 46.34],
        [color1, 47.14],
        [color2, 47.68],
        [color3, 48.21],
        [color2, 48.51],
        [color1, 49.51],
        [color2, 50.01],
        [color3, 50.55],
        [color2, 51.35],
        [color1, 51.85],
    ],
    [
        [color2, 9.27],
        [color2, 9.82],
        [color2, 10.37],
        [color2, 11.36],
        [color2, 11.46],
        [color2, 11.73],
        [color3, 12.03],
        [color2, 12.30],
        [color4, 12.41],
        [color2, 13.64],
        [color2, 14.19],
        [color2, 14.74],
        [color2, 15.73],
        [color2, 15.83],
        [color2, 16.16],
        [color3, 16.46],
        [color2, 16.73],
        [color4, 16.84],
        [color2, 18.01],
        [color2, 18.56],
        [color2, 19.11],
        [color2, 20.10],
        [color2, 20.20],
        [color2, 20.53],
        [color3, 20.83],
        [color2, 21.10],
        [color4, 21.21],
        [color2, 22.38],
        [color2, 22.93],
        [color2, 23.48],
        [color2, 24.47],
        [color2, 24.57],
        [color2, 24.89],
        [color3, 25.20],
        [color2, 25.44],
        [color4, 25.58],
        [color2, 26.75],
        [color2, 27.32],
        [color2, 27.86],
        [color2, 28.79],
        [color2, 28.96],
        [color2, 29.23],
        [color3, 29.49],
        [color2, 29.76],
        [color4, 29.91],
        [color1, 31.13],
        [color1, 31.40],
        [color1, 31.83],
        [color1, 32.09],
        [color2, 32.23],
        [color3, 32.38],
        [color2, 32.81],
        [color3, 33.33],
        [color3, 33.63],
        [color3, 34.03],
        [color3, 34.30],
        [color4, 34.43],
        [color2, 34.96],
        [color3, 35.53],
        [color3, 35.80],
        [color3, 36.20],
        [color3, 36.48],
        [color4, 36.61],
        [color5, 36.77],
        [color2, 37.17],
        [color2, 37.70],
        [color2, 37.97],
        [color2, 38.37],
        [color2, 38.67],
        [color3, 38.80],
        [color2, 39.87],
        [color2, 40.44],
        [color2, 40.97],
        [color2, 41.94],
        [color2, 42.08],
        [color2, 42.34],
        [color3, 42.60],
        [color2, 42.91],
        [color4, 43.04],
        [color2, 44.24],
        [color2, 44.81],
        [color2, 45.34],
        [color2, 46.31],
        [color2, 46.44],
        [color2, 46.74],
        [color3, 46.98],
        [color2, 47.28],
        [color4, 47.41],
        [color2, 48.61],
        [color2, 49.14],
        [color2, 49.71],
        [color2, 50.65],
        [color2, 50.81],
        [color2, 51.08],
        [color3, 51.35],
        [color2, 51.61],
        [color4, 51.75],
        [color2, 52.98],
        [color5, 53.65],
        [color5, 53.82],
        [color4, 53.95],
        [color3, 54.08],
        [color3, 54.35],
        [color3, 54.62],
        [color4, 56.29],
        [color5, 56.29],
        [color2, 56.82],
        [color4, 56.82],
        [color1, 57.35],
        [color2, 57.35],
    ],
]

//Objects
const greenEnd = {
    x: center.x,
    y: center.y * 1.5,
    radius: endRadius,
    color: color1,
}
const redEnd = {
    x: center.x,
    y: center.y * 1.25,
    radius: endRadius,
    color: color2,
}
const yellowEnd = {
    x: center.x,
    y: center.y,
    radius: endRadius,
    color: color3,
}
const blueEnd = {
    x: center.x,
    y: center.y * 0.75,
    radius: endRadius,
    color: color4,
}
const orangeEnd = {
    x: center.x,
    y: center.y  * 0.5,
    radius: endRadius,
    color: color5,
}

// FUNCTIONS

// Resize
const resize = () =>
{
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
    center.x = $canvas.width * 0.5
    center.y = $canvas.height * 0.5
    greenEnd.x = redEnd.x = yellowEnd.x = blueEnd.x = orangeEnd.x = center.x
    greenEnd.y = center.y * 1.5
    redEnd.y = center.y * 1.25
    yellowEnd.y = center.y
    blueEnd.y = center.y * 0.75
    orangeEnd.y = center.y * 0.5
}

window.addEventListener('resize', resize)
resize()

// Launch the game
const launchGame = () => {
    $audio.setAttribute('src','assets/musics/music' + musicNumber + '.mp3');
    for (const note of musics[musicNumber]) {
        notes.push(note)
    }
    $audio.play()
    $audio.volume = 1
    createNotes()
}

const createNotes = () => {
    for(const note of notes) {
        note.time = note[1] - timeTravel
        note.radius = globalRadius
        note.x = - globalRadius
        switch(note[0]) {
            case color1 :
                note.y = greenEnd.y
                note.color = greenEnd.color
                break;
            case color2 :
                note.y = redEnd.y
                note.color = redEnd.color
                break;
            case color3 :
                note.y = yellowEnd.y
                note.color = yellowEnd.color
                break;
            case color4 :
                note.y = blueEnd.y
                note.color = blueEnd.color
                break;
            case color5 :
                note.y = orangeEnd.y
                note.color = orangeEnd.color
                break;
        }
    }
}

const particles = []

const createParticles = (noteY, noteColor) => {
    for (let i = 0; i < 10; i++){
        const particle = {}

        particle.x = center.x
        particle.y = noteY
        particle.angle = Math.random() * Math.PI * 2
        particle.color = noteColor
        particle.radius = globalRadius / 5
        particle.speed = 0.5 + Math.random() * 2
        particle.direction = (Math.random() - 0.5)

        particles.push(particle)
    }
}



window.addEventListener('keydown', (event) => {
    if (myRole === 'beater') {
        switch (notes[0].color) {
            case color1 : // Green
                if (event.keyCode === 65) { // Press A
                    scoring()
                    createParticles(color1)
                }
                break;
            case color2 : // Red
                if (event.keyCode === 90) { // Press Z
                    scoring()
                }
                break;
            case color3 : // Yellow
                if (event.keyCode === 69) { // Press E
                    scoring()
                }
                break;
            case color4 : // Blue
                if (event.keyCode === 82) { // Press R
                    scoring()
                }
                break;
            case color5 : // Orange
                if (event.keyCode === 84) { // Press T
                    scoring()
                }
                break;
        }
    }
})


const clear = () => {
    context.clearRect(0, 0, $canvas.width, $canvas.height)
}

const loop = () =>
{
    if($audio.currentTime !== $audio.duration) {
        window.requestAnimationFrame(loop)
        resize()
        update()
        clear()
        draw()
        $scoreValue.textContent = score
    } else {
        $restartPopup.style = 'display: block'
        $audio.currentTime = 0
    }
}
loop()

const scoring = () => {
    if (notes[0].x + notes[0].radius > center.x - endRadius && notes[0].x - notes[0].radius < center.x - endRadius) { // Pressed the key too soon
        score += 50
        tooSoon++
        createParticles(notes[0].y, notes[0].color)
        notes.shift()
    } else if (notes[0].x - notes[0].radius > center.x - endRadius && notes[0].x + notes[0].radius < center.x + endRadius) { // Pressed at the perfect time
        score += 150
        perfect++
        createParticles(notes[0].y, notes[0].color)
        notes.shift()
    } else if (notes[0].x - notes[0].radius > center.x + endRadius){ // Pressed too late
        score += 50
        tooLate++
        createParticles(notes[0].y, notes[0].color)
        notes.shift()
    }
}

// Launch the game again if the player press the restart button
$restartButton.addEventListener('mousedown', () => {
    $restartPopup.style = 'display: none'
    launchGame()
    loop()
})