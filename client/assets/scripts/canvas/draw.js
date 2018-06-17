const drawEnds = () => {
    context.save()
    context.translate(center.x, center.y)
    context.rotate(angle * Math.PI / 180)
    context.translate(-center.x, -center.y)

    //green
    context.beginPath()
    context.arc(greenEnd.x, greenEnd.y, greenEnd.radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(0, 126, 0, 0.2)'
    context.fill()
    context.strokeStyle = greenEnd.color
    context.stroke()
    //red
    context.beginPath()
    context.arc(redEnd.x, redEnd.y, redEnd.radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(255, 0, 0, 0.2)'
    context.fill()
    context.strokeStyle = redEnd.color
    context.stroke()
    //yellow
    context.beginPath()
    context.arc(yellowEnd.x, yellowEnd.y, yellowEnd.radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(255, 255, 0, 0.2)'
    context.fill()
    context.strokeStyle = yellowEnd.color
    context.stroke()
    //blue
    context.beginPath()
    context.arc(blueEnd.x, blueEnd.y, blueEnd.radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(0, 0, 255, 0.2)'
    context.fill()
    context.strokeStyle = blueEnd.color
    context.stroke()
    //orange
    context.beginPath()
    context.arc(orangeEnd.x, orangeEnd.y, orangeEnd.radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(255, 165, 0, 0.2)'
    context.fill()
    context.strokeStyle = orangeEnd.color
    context.stroke()

    context.restore()
}

const drawNotes = () => {
    for(const note of notes) {
        context.beginPath()
        context.save()
        context.translate(center.x, center.y)
        context.rotate(angle * Math.PI / 180)
        context.translate(-center.x, -center.y)
        context.arc(note.x, note.y, note.radius, 0, Math.PI * 2)
        context.fillStyle = note.color
        context.fill()
        context.restore()
    }
}

const drawParticles = () => {
    for(const particle of particles)
    {
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = particle.color
        context.fill()
    }
}

const draw = () => {
    drawNotes()
    drawEnds()
    drawParticles()
}