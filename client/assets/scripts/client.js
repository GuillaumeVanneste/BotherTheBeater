// set-up a connection between the client and the server
const socket = io({transports: ['websocket'], upgrade: false})
const $roomsTable = document.querySelector('.roomsTable')
const $modalRoom = document.querySelector('.modalRoom')
const $modalTitle = document.querySelector('.modalTitle')
let allRooms = []

socket.on("updateBrowser", (currentRooms) => {
    if(!arraysEqual(allRooms, currentRooms)) {
        allRooms = currentRooms
        $roomsTable.innerHTML = ""
        if(currentRooms.length === 0) { // No room yet
            const row = $roomsTable.insertRow(0)
            const cell1 = row.insertCell(0)
            cell1.innerHTML = 'Any room has been created yet !'
        } else {
            for (let i = 0; i < currentRooms.length; i++) {
                const row = $roomsTable.insertRow(i)
                const cell1 = row.insertCell(0)
                const cell2 = row.insertCell(1)
                const cell3 = row.insertCell(2)
                const cell4 = row.insertCell(3)
                cell1.innerHTML = currentRooms[i][0]
                if(currentRooms[i].length - 2 === 1) { // Display number of client in room
                    cell2.style = 'color: green'
                    cell2.innerHTML = currentRooms[i].length - 2 + '/2'
                } else {
                    cell2.style = 'color: red'
                    cell2.innerHTML = 'full'
                }
                if(currentRooms[i][1] === '0') { // Display the difficulty of the room
                    cell3.innerHTML = 'Easy'
                } else {
                    cell3.innerHTML = 'Medium'
                }
                cell4.innerHTML = '<button type="submit" class="waves-effect waves-light btn-small orange modal-trigger" data-target="modal1">Join</button>'
                const triggerModal = cell4.querySelector('button')
                triggerModal.addEventListener('mousedown', () => { // Quick join
                    $modalTitle.innerHTML = 'Joining ' + currentRooms[i][0]
                    $modalRoom.value = currentRooms[i][0]
                })
            }
        }
    }
})

window.setInterval(function () {socket.emit('askBrowser')}, 1000) // Ask every seconds an update of the browser

// Function to detect if 2 arrays are egals
const arraysEqual = (array1, array2) => {
    if(array1.length !== array2.length)
        return false
    for(let i = 0; i < array1.length; i++) {
        if(array1[i] !== array2[i])
            return false
    }
    return true
}

// modal fucntion from materialize to activate the modal on the click of the quick join button
$(document).ready(function(){
    $('.modal').modal()
})