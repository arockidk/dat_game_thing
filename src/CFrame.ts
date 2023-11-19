// import { Matrix } from "./Matrix.js";
// import { Vector2 } from "./Vector2.js";

// export class CFrame {
//     private _position: Vector2;
//     private _upVector: Vector2;
//     private _lookVector: Vector2;
//     private _matrix: Matrix<number>;
//     public constructor(r00: number, r01: number, r02: number, r10: number, r11: number, r12: number, r20: number, r21: number, r22: number)
//     public constructor(position: Vector2, lV: Vector2, uV: Vector2)
//     public constructor(position: Vector2) 
//     public constructor(p1: Vector2 | number, p2?: Vector2 | number, p3?: Vector2 | number, r10?: number, r11?: number, r12?: number, r20?: number, r21?: number, r22?: number) {
//         if (p1 instanceof Vector2) {
//             if (!!p2) {
//                 // Only one param, position
//                 this._position = p1;
//                 this._upVector = Vector2.UP;
//                 this._lookVector = Vector2.RIGHT;
//                 this._matrix = new Matrix(new Vector2(3,3));
//             } else {
//                 this._position = p1;
//                 this._upVector = p2 as any as Vector2;
//                 this._lookVector = p3 as any as Vector2;
//                 this._matrix = new Matrix(new Vector2(3,3));



//            }
//         } else {
//             this._matrix = Matrix.from([
//                 [p1, p2, p3],
//                 [r10, r11, r12],
//                 [r20, r21, r22]
//             ]) as Matrix<number>;
//         }
//     }
//     public static LookAt(a: Vector2, b: Vector2) {
//         return new this();

//     }
// }