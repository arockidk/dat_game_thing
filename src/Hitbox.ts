import { Rectangle } from "./Rectangle.js";
import { Vector2 } from "./Vector2.js";

export class Hitbox {
    public _rect: Rectangle;
    public constructor(width: number, height: number, bl_x: number, bl_y: number)
    public constructor(width: number, height: number, center: Vector2)
    public constructor(width: number, height: number, a: Vector2 | number, b?: number) {
        if (a instanceof Vector2) {
            this._rect = new Rectangle(
                new Vector2(
                    a.x - width / 2, 
                    a.y + height / 2
                ),
                new Vector2(
                    a.x + width / 2, 
                    a.y - height / 2
                ),
                width,
                height
            );
        } else {
            b = b as number;
            this._rect = new Rectangle(
                new Vector2(a,b),
                new Vector2(a + width, b - height),
                width,
                height
            );
        }

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