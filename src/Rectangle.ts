import { Vector2 } from "./Vector2.js";

export class Rectangle {
    private _bl: Vector2;
    private _tr: Vector2;
    private _width: number;
    private _height: number;
    public constructor(bl: Vector2, tr: Vector2, width: number, height: number) {
        this._bl = bl;
        this._tr = tr;
        this._width = width;
        this._height = height;
    }
    public intersects(position: Vector2): boolean
    public intersects(other: Rectangle): boolean
    public intersects(param: Vector2 | Rectangle): boolean {
        let bl_a_x = this._bl.x, bl_a_y = this._bl.y, tr_a_x = this._tr.x, tr_a_y = this._tr.y;
        if (param instanceof Vector2) {
            let p_x = param.x;
            let p_y = param.y;
            if (p_x < tr_a_x && p_x > bl_a_x && p_y < bl_a_y && p_y > tr_a_x && p_y > tr_a_y) {
                return true;
            } else {
                return false;
            }
        } else {
            let bl_b_x = param._bl.x, bl_b_y = param._bl.y, tr_b_x = param._tr.x, tr_b_y = param._tr.y;
            // let a = (this._tr.y <= other._bl.y) || (this._bl.y >= other._tr.y);
            // let b = (this._bl.x >= other._tr.x) || (this._tr.x <= other._bl.x);  
            if (this._bl.x != 0) {
                // console.log(
                //     bl_a_x >= tr_b_x,
                //     tr_a_x <= bl_b_x,
                //     bl_a_y <= tr_b_y,
                //     tr_a_y >= bl_b_y, 
                //     [this,other])
            }
        
            if (bl_a_x >= tr_b_x || tr_a_x <= bl_b_x || bl_a_y <= tr_b_y ||
                tr_a_y >= bl_b_y) {
                return false;
            } else {
                return true;
            }
            }
        
       

                
        
        
    }
    public setTR(value: Vector2, update: boolean) { 
        if ((value.x < this._bl.x) || (value.y < this._bl.y)) {
            throw new Error("Tried to set top right corner too far in the wrong direction");
        } else {
            this._tr = value;
            if (update) { 
                this._width = this._tr.x - this._bl.x;
                this._height = this._tr.y - this._bl.y;
            }
        }
    }
    public setBL(value: Vector2, update: boolean) { 
        if ((value.x > this._tr.x) || (value.y > this._tr.y)) {
            throw new Error("Tried to set bottom left corner too far in the wrong direction");

        } else { 
            this._bl = value;
            if (update) {
                this._width = this._tr.x - this._bl.x;
                this._height = this._tr.y - this._bl.y;
            }
        }
    }
    public getTR(): Vector2 { return this._tr; }
    public getBL(): Vector2 { return this._bl; }
    public getWidth(): number { return this._width; }
    public getHeight(): number { return this._height; }
    public calculateBounds(center: Vector2) {
        this._bl = new Vector2(
            center.x - this._width / 2, 
            center.y + this._height / 2
        );
        this._tr = new Vector2(
            center.x + this._width / 2, 
            center.y - this._height / 2
        );
        
    }
}