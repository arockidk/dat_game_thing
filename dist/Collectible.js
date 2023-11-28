import { Hitbox } from "./Hitbox.js";
import { Vector2 } from "./Vector2.js";
import { WorldObject } from "./WorldObject.js";
export default class Collectible extends WorldObject {
    constructor(pixi_object, world, position = Vector2.ZERO, rotation = 0, hitbox = new Hitbox(0, 0, Vector2.ZERO), parent) {
        super(pixi_object, world, position, rotation, hitbox, parent);
        this.canCollide = false;
    }
}
//# sourceMappingURL=Collectible.js.map