import Collectible from "./Collectible.js";
import { Game } from "./Game.js";
import { WorldObject } from "./WorldObject.js";

export default class Cheese extends Collectible {
    public onCollect(game: Game, obj: WorldObject): void {
        game.points++;
        this.destroy();
    }
    
}