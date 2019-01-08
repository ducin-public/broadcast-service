const server = require('http').createServer()
const io = require('socket.io')(server)

const { randomId, getDelay, stringify } = require('./lib/utils')
const { logClients, subscribe, unsubscribe } = require('./lib/clients')
const { getCurrentState, update } = require('./lib/state')

const argv = require('yargs')
  .alias('v', 'verbose')
  .option('port', {
    default: 3000,
    alias: 'p'
  }).option('delay', {
    default: 2000,
    alias: 'd'
  }).argv;

server.listen(argv.port)

const delay = getDelay(argv.delay)

console.info(`Broadcast service listening on port ${argv.port}`)
console.info(`with delay: ${argv.delay}ms`)
console.info()

io.on('connection', (socket) => {
  const id = subscribe(socket)
  
  const emitState = () => {
    socket.emit('state', {
      ...getCurrentState(),
      clientId: id
    })
  }

  // initially
  emitState()

  socket.on('state', function (data) {
    emitState()
  })

  socket.on('data', function (data) {
    const requestID = randomId();
    console.info(`Request from local ID:${requestID}, received: ${stringify(data)}`)
    const newState = update(data)
    console.log(`New state: ${stringify(newState)}`)

    console.info(`Broadcasting request ID:${requestID} starting`)
    socket.broadcast.emit('data', data)
    console.info(`Broadcasting request ID:${requestID} completed`)
  })

  socket.on('disconnect', function () {
    unsubscribe(id)
  })
})
