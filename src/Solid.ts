import { Container, DisplayObject } from "pixi.js";
import { Hitbox } from "./Hitbox.js";
import Instance from "./Instance.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";
import { WorldObject } from "./WorldObject.js";

export default class Solid extends WorldObject {
    
    protected declare _pixiObject : PIXI.Sprite;

    

    public constructor(pixiObject: PIXI.Sprite, world?: World, position: Vector2 = Vector2.ZERO, rotation: number = 0, hitbox: Hitbox = new Hitbox(0, 0, Vector2.ZERO), parent?: Instance) { 
        super(pixiObject, world, position, rotation, hitbox);

    }
    public get pixi_object(): PIXI.Sprite {
        return this._pixiObject;
    }
    public set pixi_object(value: PIXI.Sprite)  {
        this._pixiObject = value;
    }
}