import { Hitbox } from "./Hitbox.js";
import { Signal } from "./Signal.js";
import { Vector2 } from "./Vector2.js";
import { WorldObject } from "./WorldObject.js";
export default class Actor extends WorldObject {
    className = "Actor";
    onTouch = new Signal();
    constructor(pixi_object, world, position = Vector2.ZERO, rotation = 0, hitbox = new Hitbox(0, 0, Vector2.ZERO), parent) {
        pixi_object.pivot.set(0.5, 0.5);
        pixi_object.anchor.set(0.5, 0.5);
        super(pixi_object, world, position, rotation, hitbox, parent);
    }
    moveX(amount, on_collide) {
        if (this._world) {
            this._x_remainder += amount;
            let move = Math.round(this._x_remainder);
            let sign = amount / Math.abs(amount);
            if (move != 0) {
                this._x_remainder -= move;
                while (move != 0) {
                    this.position = this._position.add(new Vector2(sign, 0));
                    let colliding = this._world.get_colliding_objects(this);
                    // console.log(colliding.length);
                    if (colliding.length == 0) {
                        move -= sign;
                    }
                    else {
                        this.onTouch.Fire(colliding);
                        this.position = this._position.sub(new Vector2(sign, 0));
                        if (on_collide) {
                            on_collide();
                        }
                        this._velocity = new Vector2(0, this.velocity.y);
                        break;
                    }
                }
            }
        }
    }
    moveY(amount, on_collide) {
        if (this._world) {
            this._y_remainder += amount;
            let move = Math.round(this._y_remainder);
            if (move != 0) {
                this._y_remainder -= move;
                let sign = move / Math.abs(move);
                while (move != 0) {
                    this.position = this._position.add(new Vector2(0, sign));
                    let colliding = this._world.get_colliding_objects(this);
                    if (colliding.length == 0) {
                        move -= sign;
                    }
                    else {
                        this.onTouch.Fire(colliding);
                        this.position = this._position.sub(new Vector2(0, sign));
                        if (on_collide) {
                            on_collide();
                        }
                        this._velocity = new Vector2(this.velocity.x, 0);
                        break;
                    }
                }
            }
        }
    }
    destroy() {
        super.destroy();
        for (let i in this.onTouch.connections) {
            this.onTouch.connections[i].Disconnect();
            delete this.onTouch.connections[i];
        }
    }
    get pixi_object() { return this._pixi_object; }
    set pixi_object(value) { this._pixi_object = value; }
}
//# sourceMappingURL=Actor.js.map