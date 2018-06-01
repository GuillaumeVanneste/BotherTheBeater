// set-up a connection between the client and the server
const socket = io({transports: ['websocket'], upgrade: false})
const $roomsTable = document.querySelector('.roomsTable')
const $modalRoom = document.querySelector('.modalRoom')

socket.on("updateBrowser", (currentRooms) => {
    console.log(currentRooms)
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
            cell3.innerHTML = '<button type="sumbit" class="waves-effect waves-light btn-small orange modal-trigger" data-target="modal1">Join</button>'
            console.log("create rooms")
            const triggerModal = cell3.querySelector('button')
            triggerModal.addEventListener('mousedown', () => {
                $modalRoom.value = currentRooms[i]
            })
        }
    }
    console.log("Browser updated")
})

window.setInterval(function () {socket.emit('askBrowser')}, 1000)

$(document).ready(function(){
    $('.modal').modal()
})
