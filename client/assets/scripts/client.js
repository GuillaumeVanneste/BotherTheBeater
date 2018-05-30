// set-up a connection between the client and the server
const socket = io({transports: ['websocket'], upgrade: false})
const roomsTable = document.querySelector('.roomsTable')
let allRooms = []
socket.on("browser", (currentRooms) => {
    for(let i = 0; i < currentRooms.length; i++) {
        const row = roomsTable.insertRow(i)
        const cell1 = row.insertCell(0)
        const cell2 = row.insertCell(1)
        cell1.innerHTML = currentRooms[i]
        cell2.innerHTML = '1/2'
        console.log("create rooms")
    }
    allRooms = currentRooms
    console.log("browser")
})