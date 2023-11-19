import { Vector2 } from "./Vector2.js";
import { WorldObject } from "./WorldObject.js";
export default class Actor extends WorldObject {
    className = "Actor";
    speed = 2;
    setSpeed(value) {
        this.speed = value;
        return this;
    }
    getSpeed() { return this.speed; }
    moveX(amount, on_collide) {
        if (this._world) {
            this._x_remainder += amount;
            let move = Math.round(this._x_remainder);
            if (move != 0) {
                this._x_remainder -= move;
                let sign = move / Math.abs(move);
                while (move != 0) {
                    if (!this._world.is_colliding(this._position.add(new Vector2(sign, 0)))) {
                        this.position = this._position.add(new Vector2(sign, 0));
                        move -= sign;
                    }
                    else {
                        if (on_collide) {
                            on_collide();
                        }
                        break;
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=Actor.js.map