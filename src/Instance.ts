import { World } from "./World.js";

export default class Instance {
    protected _children: Instance[];
    protected _parent?: Instance;
    protected _world?: World;
    public readonly className: string = "Instance";
    public name: string;
    public constructor(parent?: Instance, world?: World) {
        this._world = world;
        this._children = [];
        this._parent = parent;
        this.name = "Instance";
    }
    
    public get world(): World | undefined {
        return this._world;
    }
    public set world(v: World) {
        this._world = v;
    }
    
    public get parent(): Instance | undefined { return this._parent; }
    public set parent(value: Instance | undefined) {
        if (this._parent) {
            this._parent._children.splice(this._parent._children.indexOf(this),1)
        }
        this._parent = value;
        if (value) {
            value._children.push(this);
        }
        
    }
    protected rawSetParent(value: Instance): void {
        this._parent = value;
    }
    public getChildren(): Instance[] { return this._children }
    public getDescendants(): Instance[] { 
        let descendants: Instance[] = [];
        let stack: Instance[] = [];
        for (let child of this._children) { 
            stack.push(child);
            while (stack.length > 0) { 
                let instance: Instance = stack.pop() as Instance;
                descendants.push(instance);
                for (let i = instance.getChildren().length - 1; i < -1; i--) { 
                    stack.push(instance.getChildren()[i]);
                }
            }
        }
        return descendants;
    }
    public findFirstAnscestor(name: string): Instance | undefined { 
        let parent = this._parent;
        while (parent) {
            if (parent.name === name) {
                return parent;
            } else {
                parent = parent.parent
            }
        }
        return undefined;
    }
    public findFirstAnscestorOfClass(className: string): Instance | undefined { 
        let parent = this._parent;
        while (parent) {
            if (parent.className === className) {
                return parent;
            } else {
                parent = parent.parent
            }
        }
        return undefined;
    }
    public findFirstAnscestorWhichIsA(cls: {new(...args: any): Instance}): Instance | undefined { 
        let parent = this._parent;
        while (parent) {
            if (parent.isA(cls)) {
                return parent;
            } else {
                parent = parent.parent
            }
        }
        return undefined;
    }
    public findFirstChild(name: string): Instance | undefined  {
        for (let child of this._children) { 
            if (child.name === name) { 
                return child;
            }
        }
        return undefined;
    }
    public findFirstChildOfClass(className: string): Instance | undefined { 
        for (let child of this._children) { 
            if (child.className === className) { 
                return child;
            }
        }
        return undefined;
    }
    public findFirstChildWhichIsA(cls: {new(...args: any): Instance}): Instance | undefined { 
        for (let child of this._children) { 
            if (child.isA(cls)) { 
                return child;
            }
        }
        return undefined;
    }
    public isA(cls: {new(...args: any): Instance}): boolean { return this instanceof cls};
    
}
