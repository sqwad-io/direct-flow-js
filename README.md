# Sqwad DirectFlow Client Javascript / Typescript library

Instant bidirectional interactions made easy !

*Note: we use socket.io library for client layer with auto-reconnect and WebSocket / Long polling usage.*

The library is coded on typescript so all types are defined, except for custom ones.

## CDN Use

```html
<script src="https://cdn.jsdelivr.net/npm/@sqwad/direct-flow" crossorigin="anonymous"></script>
<script>
  const d = new DirectFlow('your-uuid', 'client-key')

  d.broadcast('Hello world')

  d.onMessage((message) => {
    console.log(message)
  })
</script>
```

## Installation

```shell
yarn add @sqwad/direct-flow
```

or

```shell
npm install @sqwad/direct-flow
```

### Javascript Usage

```html

<script type="module">
    import {DirectFlow} from '@sqwad/direct-flow'

    const d = new DirectFlow('your-uuid', 'client-key')

    d.broadcast('Hello world')

    d.onMessage((message) => {
        console.log(message)
    })
</script>
```

### Event driven usage

```html

<script type="module">
    import {DirectFlow} from '@sqwad/direct-flow'

    const d = new DirectFlow('your-uuid', 'client-key')

    d.broadcast('Hello world')

    // Instantiate all event dispatchers
    d.onMessage()

    addEventListener(DirectFlowEventType.GLOBAL, (message) => console.log(message))
</script>
```

## Methods

- `connect`: connect to server (not needed, connected in constructor)
- `release`: disconnect from server
- `broadcast`: send message to anyone **except us** (can be string or object)
- `send`: broadcast alias
- `sendTo`: send to specific client
- `sendToChannel`: send to channel on server (can be string or object)
- `rawSend`: send any data to server, but need to be an object
- `subscribe`: listen to one or more specific channel (string or object)
- `unsubscribe`: stop listening for one or more specific channel (string or object)
- `onMessage`: action to do when receiving message, parameter is optional and instantiate event dispatchers, you should
  call once only.
