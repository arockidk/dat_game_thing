
import { Vector2 } from "./Vector2.js";
import { WorldObject } from "./WorldObject.js";

export default class Actor extends WorldObject  {
    public className: string = "Actor";
    protected speed: number = 2;
    public setSpeed(value: number): Actor {

        this.speed = value;
        return this;
    }
    public getSpeed(): number { return this.speed; }
    public moveX(amount: number, on_collide?: Function) { 
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
                    } else {
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