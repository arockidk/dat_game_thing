import Collectible from "./Collectible.js";
export default class Cheese extends Collectible {
    onCollect(game, obj) {
        game.points++;
        this.destroy();
    }
}
//# sourceMappingURL=Cheese.js.map