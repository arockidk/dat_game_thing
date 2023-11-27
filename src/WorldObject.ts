import { Sprite } from "pixi.js";
import { Hitbox } from "./Hitbox.js";
import Instance from "./Instance.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";

export class WorldObject extends Instance {
    protected _position: Vector2;
    protected _hitbox: Hitbox;
    protected _pixi_object: PIXI.Container;
    protected _rotation: number;
    protected _velocity: Vector2;
    protected _canCollide: boolean;
    protected _hitboxOffset: Vector2;
    protected _anchored: boolean
    protected _x_remainder: number = 0;
    protected _y_remainder: number = 0;
    
    public readonly className: string = "WorldObject";
    public constructor(pixi_object: PIXI.Container, world?: World, position: Vector2 = Vector2.ZERO, rotation: number = 0, hitbox: Hitbox = new Hitbox(0, 0, Vector2.ZERO), parent?: Instance) {
        super(parent, world)
        
        this._position = position;
        this._rotation = rotation;
        this._hitbox = hitbox;
        pixi_object.position = position;
        pixi_object.angle = rotation;
        
        this._pixi_object = pixi_object;
        
        this._velocity = Vector2.ZERO;
        this._canCollide = true;
        this._hitboxOffset = Vector2.ZERO
        this._anchored = false;
    }

    public get canCollide(): boolean {
        return this._canCollide;
    }
    public set canCollide(value: boolean) {
        this._canCollide = value;
    }
    public get anchored(): boolean {
        return this._anchored;
    }
    public set anchored(value: boolean) {
        this._anchored = value;
    }
    public get position(): Vector2 { return this._position; }
    public set position(v2: Vector2) {
        this._position = v2; 
        this._pixi_object.position = this._position;
        this._hitbox.calcuateBounds(
            this._position.add(this._hitboxOffset)
        );
    }
    public get rotation(): number { return this._rotation; }
    public set rotation(value: number) { 
        this._rotation = value;
        this._pixi_object.angle = this._rotation;
    }
    public get velocity(): Vector2 { return this._velocity; }

    public set velocity(v2: Vector2) { 
        this._velocity = v2;

    }
    public getHitbox(): Hitbox { return this._hitbox; }
    public setHitbox(value: Hitbox) { this._hitbox = value; }
    public get pixi_object(): PIXI.Container { return this._pixi_object; }
    public set pixi_object(value: PIXI.Container) { this._pixi_object = value;}
    public getHitboxOffset(): Vector2 { return this._hitboxOffset; }
    public setHitboxOffset(value: Vector2) { this._hitboxOffset = value;}
    public collidesWith(position: Vector2): boolean
    public collidesWith(hitbox: Hitbox): boolean
    public collidesWith(other: WorldObject): boolean
    public collidesWith(other: Vector2 | WorldObject): boolean
    public collidesWith(other: Vector2 | Hitbox | WorldObject ): boolean {
        // console.log(other)
        if (other instanceof Vector2) {
            return this._hitbox.checkCollision(other);
        } else if (other instanceof Hitbox) {
            return this._hitbox.checkCollision(other);
        } else {
            return this._hitbox.checkCollision(other._hitbox);
        }
    }
    
    public set parent(value: Instance) {
        if (this._parent instanceof WorldObject) {
            this._parent["_pixi_object"].removeChild(this._pixi_object);

        }

        if (this._parent) {
            this._parent["_children"].splice(this._parent["_children"].indexOf(this),1)
        }
        this._parent = value;
        value["_children"].push(this);
        if (value instanceof WorldObject) {
            value._pixi_object.addChild(this._pixi_object); 

        }
    }
    
}