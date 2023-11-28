type Connections = {
    [id : string]: Connection<(...args:any) =>any>
}

export class Connection<Signature extends (...args:any) =>any> {
    
    constructor(public Callback: Signature, protected Connections: Connections, protected Signal: Signal<Signature>, protected id: number) {}
    public Disconnect(): void {
        delete this.Connections[this.id];
    }
}
export class Signal<FunctionSignature extends (...args:any) =>any> {
    protected Connections: Connections;
    protected id: number;
    public constructor() {
        this.Connections = {}
        this.id = 0;
    }
    public Connect(Callback: FunctionSignature): Connection<FunctionSignature> {

        let connection = new Connection<FunctionSignature>(Callback,this.Connections,this, this.id)
        this.Connections[this.id] = connection;
        this.id++;
        return connection;
    }
    // public Wait(): ReturnType<FunctionSignature> {
        
    // }
    public Fire(...args:Parameters<FunctionSignature>): void{
        for (let connection of Object.values(this.Connections)) { 
            // console.log(connection);
            connection.Callback(args)
        }
    }
    public get connections(): Connections {
        return this.Connections;
    }
}
