const updateEnd = () => {
    window.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 65:
                greenEnd.radius = endRadius + 5
                break;
            case 90:
                redEnd.radius = endRadius + 5
                break;
            case 69:
                yellowEnd.radius = endRadius + 5
                break;
            case 82:
                blueEnd.radius = endRadius + 5
                break;
            case 84:
                orangeEnd.radius = endRadius + 5
                break;
        }
    })

    window.addEventListener('keyup', (event) => {
        switch (event.keyCode) {
            case 65:
                greenEnd.radius = endRadius
                break;
            case 90:
                redEnd.radius = endRadius
                break;
            case 69:
                yellowEnd.radius = endRadius
                break;
            case 82:
                blueEnd.radius = endRadius
                break;
            case 84:
                orangeEnd.radius = endRadius
                break;
        }
    })
}

const updateNotes = () => {
    for(const note of notes) {
        if(note.time < $audio.currentTime) {
            note.x += 12.25
        }
        if (note.x >= center.x + endRadius * 2) { // Missed
            missed++
            notes.shift()
        }
    }
}

const updateParticles = () => {
    let i = 0
    for(const particle of particles) {
        particle.x += particle.speed
        particle.y += particle.direction
        if(particle.x > center.x + (center.x / 5)) {
            particles.splice(i, 1)
        }
        i++
    }
}

const update = () => {
    updateEnd()
    updateNotes()
    updateParticles()
}