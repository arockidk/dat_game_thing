export default class Instance {
    _children;
    _parent;
    _world;
    className = "Instance";
    name;
    constructor(parent, world) {
        this._world = world;
        this._children = [];
        this._parent = parent;
        this.name = "Instance";
    }
    get world() {
        return this._world;
    }
    set world(v) {
        this._world = v;
    }
    get parent() { return this._parent; }
    set parent(value) {
        if (this._parent) {
            this._parent._children.splice(this._parent._children.indexOf(this), 1);
        }
        this._parent = value;
        if (value) {
            value._children.push(this);
        }
    }
    rawSetParent(value) {
        this._parent = value;
    }
    getChildren() { return this._children; }
    getDescendants() {
        let descendants = [];
        let stack = [];
        for (let child of this._children) {
            stack.push(child);
            while (stack.length > 0) {
                let instance = stack.pop();
                descendants.push(instance);
                for (let i = instance.getChildren().length - 1; i < -1; i--) {
                    stack.push(instance.getChildren()[i]);
                }
            }
        }
        return descendants;
    }
    findFirstAnscestor(name) {
        let parent = this._parent;
        while (parent) {
            if (parent.name === name) {
                return parent;
            }
            else {
                parent = parent.parent;
            }
        }
        return undefined;
    }
    findFirstAnscestorOfClass(className) {
        let parent = this._parent;
        while (parent) {
            if (parent.className === className) {
                return parent;
            }
            else {
                parent = parent.parent;
            }
        }
        return undefined;
    }
    findFirstAnscestorWhichIsA(cls) {
        let parent = this._parent;
        while (parent) {
            if (parent.isA(cls)) {
                return parent;
            }
            else {
                parent = parent.parent;
            }
        }
        return undefined;
    }
    findFirstChild(name) {
        for (let child of this._children) {
            if (child.name === name) {
                return child;
            }
        }
        return undefined;
    }
    findFirstChildOfClass(className) {
        for (let child of this._children) {
            if (child.className === className) {
                return child;
            }
        }
        return undefined;
    }
    findFirstChildWhichIsA(cls) {
        for (let child of this._children) {
            if (child.isA(cls)) {
                return child;
            }
        }
        return undefined;
    }
    isA(cls) { return this instanceof cls; }
    ;
}
//# sourceMappingURL=Instance.js.map