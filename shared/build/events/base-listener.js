"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        this.ackWait = 5000;
        this.client = client;
    }
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName);
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on('message', (msg) => {
            console.log(`Message recieved: ${this.subject} : ${this.queueGroupName}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
}
exports.Listener = Listener;
