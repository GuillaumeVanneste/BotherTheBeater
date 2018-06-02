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
        if(currentRooms.length === 0) {
            const row = $roomsTable.insertRow(0)
            const cell1 = row.insertCell(0)
            cell1.innerHTML = 'Any room has been created yet !'
        } else {
            for (let i = 0; i < currentRooms.length; i++) {
                const row = $roomsTable.insertRow(i)
                const cell1 = row.insertCell(0)
                const cell2 = row.insertCell(1)
                const cell3 = row.insertCell(2)
                cell1.innerHTML = currentRooms[i]
                cell2.innerHTML = '1/2'
                cell3.innerHTML = '<button type="submit" class="waves-effect waves-light btn-small orange modal-trigger" data-target="modal1">Join</button>'
                console.log("create rooms")
                const triggerModal = cell3.querySelector('button')
                triggerModal.addEventListener('mousedown', () => {
                    $modalTitle.innerHTML = 'Joining ' + currentRooms[i]
                    $modalRoom.value = currentRooms[i]
                })
            }
        }
    }
})

window.setInterval(function () {socket.emit('askBrowser')}, 1000)

$(document).ready(function(){
    $('.modal').modal()
})

const arraysEqual = (array1, array2) => {
    if(array1.length !== array2.length)
        return false
    for(let i = 0; i < array1.length; i++) {
        if(array1[i] !== array2[i])
            return false
    }
    return true
}