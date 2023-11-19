export class Connection {
    Callback;
    Connections;
    Signal;
    id;
    constructor(Callback, Connections, Signal, id) {
        this.Callback = Callback;
        this.Connections = Connections;
        this.Signal = Signal;
        this.id = id;
    }
    Disconnect() {
        delete this.Connections[this.id];
    }
}
export class Signal {
    Connections;
    id;
    constructor() {
        this.Connections = {};
        this.id = 0;
    }
    Connect(Callback) {
        let connection = new Connection(Callback, this.Connections, this, this.id);
        this.Connections[this.id] = connection;
        this.id++;
        return connection;
    }
    // public Wait(): ReturnType<FunctionSignature> {
    // }
    Fire(...args) {
        for (let connection of Object.values(this.Connections)) {
            connection.Callback(args);
        }
    }
}
//# sourceMappingURL=Signal.js.map