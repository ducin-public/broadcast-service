const socket = io('http://localhost:3000')

let cid
socket.on('state', (data) => {
  console.log('got some initial state', data)
  cid = data.clientId
})

socket.on('data', (data) => {
  console.log('got some data from someone else', data)
})

setInterval(() => {
  const dataToSend = Math.ceil(Math.random() * 20)
  console.log('sending an update to the service', dataToSend)
  socket.emit('data', dataToSend)
}, 4100)
