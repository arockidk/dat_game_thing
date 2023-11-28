import { Rectangle } from "./Rectangle.js";
import { Vector2 } from "./Vector2.js";
export class Hitbox {
    _rect;
    constructor(width, height, a, b) {
        if (a instanceof Vector2) {
            this._rect = new Rectangle(new Vector2(a.x - width / 2, a.y + height / 2), new Vector2(a.x + width / 2, a.y - height / 2), width, height);
        }
        else {
            b = b;
            this._rect = new Rectangle(new Vector2(a, b), new Vector2(a + width, b - height), width, height);
        }
    }
    checkCollision(param) {
        if (param instanceof Vector2) {
            return this._rect.intersects(param);
        }
        else {
            return this._rect.intersects(param._rect);
        }
    }
    calcuateBounds(center) {
        this._rect.calculateBounds(center);
    }
}
//# sourceMappingURL=Hitbox.js.map