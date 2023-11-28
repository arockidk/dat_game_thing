export interface Vec2 {
    x: number;
    y: number;
}
export class Vector2 {
    public x: number;
    public y: number;
    public static get ZERO() {return new Vector2(0, 0)};
    public static get UP() {return new Vector2(0, -1)};
    public static get DOWN() {return new Vector2(0, 1)};
    public static get LEFT() {return new Vector2(-1, 0)};
    public static get RIGHT() {return new Vector2(1, 0)};
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public static from(v: Vec2): Vector2 {
        return new this(v.x,v.y);
    }
    public get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    public normal(): Vector2 { 
        return (new Vector2(this.x, this.y)).div(this.magnitude);
    } 
    public add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    public sub(v: Vector2): Vector2 { 
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    public mul(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    public div(scalar: number): Vector2 { 
        return new Vector2(this.x / scalar, this.y / scalar);
    }
    public int(): Vector2 {
        return new Vector2(Math.trunc(this.x), Math.trunc(this.y));
    }  
    public transform(func: (n: number)=> number): Vector2 { 
        return new Vector2(func(this.x), func(this.y));
    } 
}