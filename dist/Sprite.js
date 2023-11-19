import { WorldObject } from "./WorldObject.js";
export default class Actor extends WorldObject {
    className = "Sprite";
    speed = 2;
    setSpeed(value) {
        this.speed = value;
        return this;
    }
    getSpeed() { return this.speed; }
}
//# sourceMappingURL=Sprite.js.map