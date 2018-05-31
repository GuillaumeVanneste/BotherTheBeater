let isPressed = false

const updateEnd = () => {
    if(isPressed) {
        redEnd.radius = endRadius + 5
    } else [
        redEnd.radius = endRadius
    ]
}

const updateNotes = () => {
    for(const note of notes) {
        if(note.time < gameTime) {
            note.x += 12.25
        }
        if (note.x >= center.x + endRadius * 2) { // Missed
            score--
            missed++
            notes.shift()
        }
    }
}

