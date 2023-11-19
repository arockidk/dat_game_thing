import { Rectangle } from "./Rectangle.js";
import { Vector2 } from "./Vector2.js";

export class Hitbox {
    public _rect: Rectangle;
    public constructor(height: number, width: number, center: Vector2) {
        this._rect = new Rectangle(
            new Vector2(
                center.x - width / 2, 
                center.y + height / 2
            ),
            new Vector2(
                center.x + width / 2, 
                center.y - height / 2
            ),
            width,
            height
        );
    }
    public checkCollision(position: Vector2): boolean
    public checkCollision(other: Hitbox): boolean
    public checkCollision(param: Vector2 | Hitbox): boolean {
        if (param instanceof Vector2) {
            return this._rect.intersects(param)
        } else {
            return this._rect.intersects(param._rect);
        }
        
    }
    public calcuateBounds(center: Vector2) {
        this._rect.calculateBounds(center);
    }


}