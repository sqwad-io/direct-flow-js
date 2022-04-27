import {io, Socket} from 'socket.io-client'
import {DirectFlowEventType, DirectFlowMessageModel} from './models'

export class DirectFlow {
    public socket!: Socket

    private static instance: DirectFlow | null = null

    /**
     *
     * @param namespace UUID of your namespace
     * @param apiKey Your API Key from dashboard
     * @param singleInstance do we need a single socket instance or not
     * @param server optional, server location
     * @param secure define if we should use http or https
     */
    constructor(namespace: string, apiKey: string, singleInstance: boolean = true, server: string | null = null, secure: boolean = false) {
        // Ensure class is instanced once (we don't need multiple sockets)
        if (DirectFlow.instance !== null && singleInstance) {
            return DirectFlow.instance
        }

        if (!namespace || !apiKey) {
            throw new Error('Namespace or API Key not set !')
        }

        this.socket = io(`${secure ? 'https' : 'http'}://${server ?? 'flow.sqwad.io'}/${namespace}/${apiKey}`)

        this.socket.on('restart', () => {
            try {
                this.disconnect()
            } catch (e) {
                //
            }
            this.connect()
        })

        if (singleInstance) {
            DirectFlow.instance = this
        }
    }

    release() {
        this.disconnect()
    }

    /**
     * Send a message to whole channel
     * @param data
     */
    broadcast(data: any) {
        this.socket.emit('message', {
            data,
        })
    }

    /**
     * Broadcast alias
     * @param data
     */
    send(data: any) {
        return this.broadcast(data)
    }

    /**
     * Send a message to a specific recipient
     * @param to uuid of recipient
     * @param data
     */
    sendTo(to: string, data: any) {
        this.socket.emit('message', {
            to,
            data,
        })
    }

    /**
     * Send to a specific channel
     * @param channel string
     * @param data
     */
    sendToChannel(channel: string, data: any) {
        this.socket.emit('message', {
            channel,
            data,
        })
    }

    /**
     * Send directly to websocket,
     * WARNING: "to", "channel" and "_metadata" are reserved top level words !
     * @param data
     */
    rawSend(data: any) {
        this.socket.emit('message', data)
    }

    /**
     * Receive message to specific channel
     * @param channel accept single or array of strings
     */
    subscribe(channel: string | string[]) {
        if (typeof channel === 'object') {
            for (const c of channel) {
                this.socket.emit('subscribe', {channel: c})
            }
        } else {
            this.socket.emit('subscribe', {channel})
        }
    }

    /**
     * Unsubscribe from channel
     * @param channel accept single or array of strings
     */
    unsubscribe(channel: string | string[]) {
        if (typeof channel === 'object') {
            for (const c of channel) {
                this.socket.emit('unsubscribe', {channel: c})
            }
        } else {
            this.socket.emit('unsubscribe', {channel})
        }
    }

    /**
     * Listen for messages on websocket channel
     * @param listener
     */
    onMessage(listener?: (payload: DirectFlowMessageModel) => void) {
        this.socket.on('message', (payload: DirectFlowMessageModel) => {
            if (payload.to) {
                dispatchEvent(
                    new CustomEvent(DirectFlowEventType.DIRECT, {
                        detail: payload,
                    }),
                )
            } else if (payload.channel) {
                dispatchEvent(
                    new CustomEvent(`${DirectFlowEventType.CHANNEL}${payload.channel}`, {
                        detail: payload,
                    }),
                )
            } else {
                dispatchEvent(
                    new CustomEvent(DirectFlowEventType.GLOBAL, {
                        detail: payload,
                    }),
                )
            }

            if (listener) listener(payload)
        })
    }

    disconnect() {
        this.socket.disconnect()
    }

    /**
     * Auto connect on constructor, but can be reconnected if needed
     */
    connect() {
        this.socket.connect()
    }
}
