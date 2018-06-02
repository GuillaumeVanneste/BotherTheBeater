// Set-up canvas
const $canvas = document.querySelector('canvas')
const context = $canvas.getContext('2d')
const $score = document.querySelector('.score')
const center = {x: $canvas.width * 0.5, y: $canvas.height * 0.5} // Center of canvas
let angle = 0

// Resize
const resize = () =>
{
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
    center.x = $canvas.width * 0.5
    center.y = $canvas.height * 0.5
}

window.addEventListener('resize', resize)
resize()

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
let gameTime = 0
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

notes = musics[0]

// Set timer
const timer = () => {
    if(isReady) {
        gameTime += 0.01
        $audio.play()
    }
}
window.setInterval(timer, timerSpeed)

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
createNotes()

window.addEventListener('keydown', (event) => {
    switch (notes[0].color) {
        case color1 : // Green
            if (event.keyCode === 65) { // Press A
                scoring()
            }
            break;
        case color2 : // Red
            if (event.keyCode === 90) { // Press Z
                scoring()
                isPressed = true
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
})
window.addEventListener('keyup', () => {
    isPressed = false
})


const clear = () => {
    context.clearRect(0, 0, $canvas.width, $canvas.height)
}

const loop = () =>
{
    window.requestAnimationFrame(loop)
    updateNotes()
    updateEnd()
    clear()
    draw()
    $score.textContent = score
}
loop()

const scoring = () => {
    if (notes[0].x + notes[0].radius > center.x - endRadius && notes[0].x - notes[0].radius < center.x - endRadius) { // Pressed the key too soon
        score += 50
        tooSoon++
        notes.shift()
    } else if (notes[0].x - notes[0].radius > center.x - endRadius && notes[0].x + notes[0].radius < center.x + endRadius) { // Pressed at the perfect time
        score += 150
        perfect++
        notes.shift()
    } else if (notes[0].x - notes[0].radius > center.x + endRadius){ // Pressed too late
        score += 50
        tooLate++
        notes.shift()
    }
}