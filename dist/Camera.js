export default class Camera {
    _focus;
    _position;
    constructor(pos) {
        this._position = pos;
    }
    set focus(worldObject) {
        this._focus = worldObject;
    }
    get focus() {
        return this._focus;
    }
    get position() {
        return this._focus ? this._focus.position : this._position;
    }
    set position(value) {
        this._focus = undefined;
        this._position = value;
    }
}
//# sourceMappingURL=Camera.js.map