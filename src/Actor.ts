
import { Hitbox } from "./Hitbox.js";
import Instance from "./Instance.js";
import Rat from "./Rat.js";
import { Connection, Signal } from "./Signal.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";
import { WorldObject } from "./WorldObject.js";

export default class Actor extends WorldObject  {
    public className: string = "Actor";
    public onTouch: Signal<(...args: WorldObject[][])=>void> = new Signal() 
    protected declare _pixi_object: PIXI.Sprite;
    public constructor(pixi_object: PIXI.Sprite, world?: World, position: Vector2 = Vector2.ZERO, rotation: number = 0, hitbox: Hitbox = new Hitbox(0, 0, Vector2.ZERO), parent?: Instance) {
        
        pixi_object.pivot.set(0.5,0.5);
        pixi_object.anchor.set(0.5,0.5);
        super(pixi_object, world, position, rotation, hitbox, parent)
    }
    public moveX(amount: number, on_collide?: Function) { 
        if (this._world) {
            this._x_remainder += amount;
            let move = Math.round(this._x_remainder);
            let sign = amount / Math.abs(amount);

            if (move != 0) {
                this._x_remainder -= move;
                

                while (move != 0) {
                    this.position = this._position.add(new Vector2(sign, 0));
                    let colliding = this._world.get_colliding_objects(this) ;
                    // console.log(colliding.length);
                    if (colliding.length == 0) { 
                        move -= sign;

                    } else {
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
    public moveY(amount: number, on_collide?: Function) { 
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

                    } else {
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
    public override destroy(): void {
        super.destroy();
        for (let i in this.onTouch.connections) { 
            this.onTouch.connections[i].Disconnect();
            delete this.onTouch.connections[i];
        }
    }
    public get pixi_object(): PIXI.Sprite { return this._pixi_object; }
    public set pixi_object(value: PIXI.Sprite) { this._pixi_object = value; }
}