import { Vector2 } from "./Vector2.js";
export class Rectangle {
    _bl;
    _tr;
    _width;
    _height;
    constructor(bl, tr, width, height) {
        this._bl = bl;
        this._tr = tr;
        this._width = width;
        this._height = height;
    }
    intersects(param) {
        let bl_a_x = this._bl.x, bl_a_y = this._bl.y, tr_a_x = this._tr.x, tr_a_y = this._tr.y;
        if (param instanceof Vector2) {
            let p_x = param.x;
            let p_y = param.y;
            if (p_x < tr_a_x && p_x > bl_a_x && p_y < bl_a_y && p_y > tr_a_x && p_y > tr_a_y) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
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
            }
            else {
                return true;
            }
        }
    }
    setTR(value, update) {
        if ((value.x < this._bl.x) || (value.y < this._bl.y)) {
            throw new Error("Tried to set top right corner too far in the wrong direction");
        }
        else {
            this._tr = value;
            if (update) {
                this._width = this._tr.x - this._bl.x;
                this._height = this._tr.y - this._bl.y;
            }
        }
    }
    setBL(value, update) {
        if ((value.x > this._tr.x) || (value.y > this._tr.y)) {
            throw new Error("Tried to set bottom left corner too far in the wrong direction");
        }
        else {
            this._bl = value;
            if (update) {
                this._width = this._tr.x - this._bl.x;
                this._height = this._tr.y - this._bl.y;
            }
        }
    }
    getTR() { return this._tr; }
    getBL() { return this._bl; }
    getWidth() { return this._width; }
    getHeight() { return this._height; }
    calculateBounds(center) {
        this._bl = new Vector2(center.x - this._width / 2, center.y + this._height / 2);
        this._tr = new Vector2(center.x + this._width / 2, center.y - this._height / 2);
    }
}
//# sourceMappingURL=Rectangle.js.map