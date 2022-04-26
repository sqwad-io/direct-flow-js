# Sqwad DirectFlow Client Javascript / Typescript library

Instant bidirectional interactions made easy !


*Note: we use socket.io library for client layer with auto-reconnect and webRTC / Long polling usage.*

The library is coded on typescript so all types are defined, except for custom ones.

## Old fashioned web import and use

```html

<script src="//cdn.jsdelivr.net/npm/socket.io-client@4.4.1/dist/socket.io.min.js"></script>
<script src="//sqwad.io/path/to/library/lib/index.js"></script>

<script>
    const c = new DirectFlow('your-uuid', 'client-key', 'sqwad.io', true)

    c.broadcast({
        foo: 'bar'
    })

    function onMessage(message) {
        console.log(message)
    }

    c.onMessage(onMessage)
</script>
```

## Installation

```shell
yarn add @sqwad-io/client
```

or

```shell
npm install @sqwad-io/client
```

### Javascript Usage

```html
<script type="module">
    import {DirectFlow} from './@sqwad-io/client/lib'

    const d = new DirectFlow('your-uuid', 'client-key', 'sqwad.io', true)

    d.broadcast('Hello world')

    d.onMessage((message) => {
        console.log(message)
    })
</script>
```

### Typescript Usage

```typescript
import { DirectFlow } from '@sqwad-io/client/src'

const d = new DirectFlow('your-uuid', 'client-key', 'sqwad.io', true)

d.broadcast('Hello world')

d.onMessage((message) => {
    console.log(message)
})
```

### Event driven usage


```typescript
import { DirectFlow } from '@sqwad-io/client/src'

const d = new DirectFlow('your-uuid', 'client-key', 'sqwad.io', true)

d.broadcast('Hello world')

// Instantiate all event dispatchers
d.onMessage()

const subscriber = addEventListener(DirectFlowEventType.GLOBAL, (message) => console.log(message))

//
// your code... //
//

const destroyThisSubscriber = () => {
    removeEventListener(subscriber)
} 
```

## Methods

- connect : connect to server (not needed, connected in constructor)
- release : disconnect from server
- broadcast : send message to anyone **except us** (can be string or object)
- send : broadcast alias
- sendTo : send to specific client
- sendToChannel : send to channel on server (can be string or object)
- rawSend : send any data to server, but need to be an object
- subscribe : listen to one or more specific channel (string or object)
- unsubscribe : stop listening for one or more specific channel (string or object)
- onMessage : action to do when receiving message, parameter is optional and instantiate event dispatchers, you should
  call once only.
