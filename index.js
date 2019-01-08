const server = require('http').createServer()
const io = require('socket.io')(server)

const argv = require('yargs')
  .alias('v', 'verbose')
  .option('port', {
    default: 3000,
    alias: 'p'
  }).argv;

server.listen(argv.port)

console.log(`dawg listening on port ${argv.port}`)
io.on('connection', (socket) => {
  console.log('incomming dawg')
  socket.emit('data', 'yo dawg!')

  let c = 0
  setInterval(() => { socket.emit('data', `keep alive, dawg! ${c++}`) }, 3000)

  socket.on('data', function () {
    console.log('wtf? dawg!')
  })

  socket.on('disconnect', function () {
    console.log('bye dawg!')
  })
})
