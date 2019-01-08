const { randomGuid } = require('./utils')

const clients = []

const logClients = () => {
  console.info(`CONNECTION > Total number of clients: ${clients.length}`)
  clients.forEach(({ id }) => console.log(`- ${id}`))
}

const subscribe = (socket) => {
  let id = randomGuid()
  const client = { id, socket }
  clients.push(client)
  console.info(`CONNECTION > Client ID:${id} connected`)
  logClients()
  return id
}

const unsubscribe = (id) => {
  let idx = clients.findIndex(c => c.id === id)
  clients.splice(idx, 1)
  console.info(`CONNECTION > Client ID:${id} disconnected`)
  logClients()
}

module.exports = {
  logClients,
  subscribe,
  unsubscribe,
}
