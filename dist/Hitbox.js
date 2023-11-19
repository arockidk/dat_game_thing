import { Rectangle } from "./Rectangle.js";
import { Vector2 } from "./Vector2.js";
export class Hitbox {
    _rect;
    constructor(height, width, center) {
        this._rect = new Rectangle(new Vector2(center.x - width / 2, center.y + height / 2), new Vector2(center.x + width / 2, center.y - height / 2), width, height);
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