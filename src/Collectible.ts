import { Game } from "./Game.js";
import { Hitbox } from "./Hitbox.js";
import Instance from "./Instance.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";
import { WorldObject } from "./WorldObject.js";

export default abstract class Collectible extends WorldObject {
    public constructor(pixi_object: PIXI.Container, world?: World, position: Vector2 = Vector2.ZERO, rotation: number = 0, hitbox: Hitbox = new Hitbox(0, 0, Vector2.ZERO), parent?: Instance) {
        super(pixi_object, world, position, rotation, hitbox, parent);
        this.canCollide = false;
    }
    public abstract onCollect(game: Game, obj: WorldObject): void;

} 