import { Hitbox } from "./Hitbox.js";
import Instance from "./Instance.js";
import { Vector2 } from "./Vector2.js";
export class WorldObject extends Instance {
    _position;
    _hitbox;
    _pixiObject;
    _rotation;
    _velocity;
    _canCollide;
    _hitboxOffset;
    _anchored;
    _x_remainder = 0;
    _y_remainder = 0;
    className = "WorldObject";
    constructor(pixiObject, world, position = Vector2.ZERO, rotation = 0, hitbox = new Hitbox(0, 0, Vector2.ZERO), parent) {
        super(parent, world);
        this._position = position;
        this._rotation = rotation;
        this._hitbox = hitbox;
        pixiObject.position = position;
        pixiObject.angle = rotation;
        this._pixiObject = pixiObject;
        this._velocity = Vector2.ZERO;
        this._canCollide = true;
        this._hitboxOffset = Vector2.ZERO;
        this._anchored = false;
    }
    get canCollide() {
        return this._canCollide;
    }
    set canCollide(value) {
        this._canCollide = value;
    }
    get anchored() {
        return this._anchored;
    }
    set anchored(value) {
        this._anchored = value;
    }
    get position() { return this._position; }
    set position(v2) {
        this._position = v2;
        this._pixiObject.position = this._position;
        this._hitbox.calcuateBounds(this._position.add(new Vector2(this._hitbox._rect.getWidth() / 2, this._hitbox._rect.getHeight() / 2)).add(this._hitboxOffset));
    }
    get rotation() { return this._rotation; }
    set rotation(value) {
        this._rotation = value;
        this._pixiObject.angle = this._rotation;
    }
    get velocity() { return this._velocity; }
    set velocity(v2) {
        this._velocity = v2;
    }
    getHitbox() { return this._hitbox; }
    setHitbox(value) { this._hitbox = value; return this; }
    getPixiObject() { return this._pixiObject; }
    setPixiObject(value) { this._pixiObject = value; return this; }
    getHitboxOffset() { return this._hitboxOffset; }
    setHitboxOffset(value) { this._hitboxOffset = value; return this; }
    collidesWith(other) {
        // console.log(other)
        if (other instanceof Vector2) {
            return this._hitbox.checkCollision(other);
        }
        else if (other instanceof Hitbox) {
            return this._hitbox.checkCollision(other);
        }
        else {
            return this._hitbox.checkCollision(other._hitbox);
        }
    }
    set parent(value) {
        if (this._parent instanceof WorldObject) {
            this._parent["_pixiObject"].removeChild(this._pixiObject);
        }
        if (this._parent) {
            this._parent["_children"].splice(this._parent["_children"].indexOf(this), 1);
        }
        this._parent = value;
        value["_children"].push(this);
        if (value instanceof WorldObject) {
            value._pixiObject.addChild(this._pixiObject);
        }
    }
}
//# sourceMappingURL=WorldObject.js.map