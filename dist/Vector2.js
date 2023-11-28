export class Vector2 {
    x;
    y;
    static get ZERO() { return new Vector2(0, 0); }
    ;
    static get UP() { return new Vector2(0, -1); }
    ;
    static get DOWN() { return new Vector2(0, 1); }
    ;
    static get LEFT() { return new Vector2(-1, 0); }
    ;
    static get RIGHT() { return new Vector2(1, 0); }
    ;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static from(v) {
        return new this(v.x, v.y);
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normal() {
        return (new Vector2(this.x, this.y)).div(this.magnitude);
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    mul(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    div(scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    }
    int() {
        return new Vector2(Math.trunc(this.x), Math.trunc(this.y));
    }
    transform(func) {
        return new Vector2(func(this.x), func(this.y));
    }
}
//# sourceMappingURL=Vector2.js.map