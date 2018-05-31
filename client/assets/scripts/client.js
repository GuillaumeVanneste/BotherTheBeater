// set-up a connection between the client and the server
const socket = io({transports: ['websocket'], upgrade: false})
const $roomsTable = document.querySelector('.roomsTable')
const $modalRoom = document.querySelector('.modalRoom')
socket.on("browser", (currentRooms) => {
    for(let i = 0; i < currentRooms.length; i++) {
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
    console.log("browser")
})

$(document).ready(function(){
    $('.modal').modal()
})
