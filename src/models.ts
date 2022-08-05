export interface DirectFlowMessageModel {
    data: any,
    to?: string
    channel?: string
    _metadata: {
        sender: string,
        milliseconds: number,
        timestamp: number,
        host: string,
        namespace: string,
    }
}

export enum DirectFlowEventType {
    DIRECT = 'DirectFlowDirectMessage',
    CHANNEL = 'DirectFlowChannelMessage',
    GLOBAL = 'DirectFlowGlobalMessage'
}
