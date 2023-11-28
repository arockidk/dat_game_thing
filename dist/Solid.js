import { Hitbox } from "./Hitbox.js";
import { Vector2 } from "./Vector2.js";
import { WorldObject } from "./WorldObject.js";
export default class Solid extends WorldObject {
    constructor(pixiObject, world, position = Vector2.ZERO, rotation = 0, hitbox = new Hitbox(0, 0, Vector2.ZERO), parent) {
        super(pixiObject, world, position, rotation, hitbox);
    }
    get pixi_object() {
        return this._pixiObject;
    }
    set pixi_object(value) {
        this._pixiObject = value;
    }
}
//# sourceMappingURL=Solid.js.map