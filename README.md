# broadcast service

## startup

`npm start` (`npm start -- -p 9898 -d 1000`) to start the server.

- websocket `http://localhost:3000` to subscribe/push events

## CLI parameters

- `port` / `p`
- `delay` / `d` - minimum delay of each response/broadcast (milliseconds)

## Client connection

Start with following code on client side:

#### markup

```html
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
```

#### client logic

```js
const socket = io('http://localhost:3000')

socket.on('state', (data) => {
	console.log('state received once', data)
})

socket.on('data', (data) => {
	console.log('data received on each client action', data)
})
```

Check `client/client.js` file for more examples, including emitting events. Adapt the code into your client application.

#### server logic

You may want to adjust the server, by providing a custom reducer that updates the server state, just as the clients send events. Modify `lib/state.js`.

# Commands

## `state` (request event + response event)

Sent once initially, and then on demand. Includes initial state and currrent client ID.

Requesting on demand: `socket.emit('state')` (request event). Needs to subscribe for `state` as well (response event).

## `data` (request event + response event)

Clients may send `data` event to notify the server about a change. It is then processed via the reducer and current state is updated (also available via `state` events). `data` events are broadcasted to all other clients.
