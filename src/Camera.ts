import { Vector2 } from "./Vector2.js";
import { WorldObject } from "./WorldObject.js";

export default class Camera {
    protected _focus?: WorldObject;
    protected _position: Vector2;
    public constructor(pos: Vector2) {
        this._position = pos;
    }
    public set focus(worldObject: WorldObject | undefined) {
        this._focus = worldObject;   
    }
    public get focus(): WorldObject | undefined {  
        return this._focus;
    }
    public get position(): Vector2 { 
        return this._focus ? this._focus.position : this._position;
    }
    public set position(value: Vector2) { 
        this._focus = undefined;
        this._position = value;
    }

}