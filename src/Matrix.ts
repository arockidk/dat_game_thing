import { Vector2 } from "./Vector2.js";

export class Matrix<T> {
    private _internal: T[][] = [];
    
    private _size : Vector2 = Vector2.ZERO;
    private height : number = 0;
    private width : number = 0;
    public get size() : Vector2 {
        return this._size;
    }
    public set size(v : Vector2) {
        this.height = v.y;
        this.width = v.x;
        this._size = v;
    }
    public constructor(size : Vector2)
    public constructor(x: number, y: number)
    public constructor(var1: number | Vector2, var2?: number) {
        if (var2) {
            return new Matrix(new Vector2(var1 as number,var2 as number));
        } else {
            this.size = var1 as Vector2;
        }
    }
    public static from<matrixType>(valueMatrix: matrixType[][]): Matrix<matrixType> {
        let height = valueMatrix.length;
        let width = 0;
        if (height > 0) {
            width = valueMatrix[0].length;
        }
        let matrix: Matrix<matrixType> = new Matrix(width,height);
        matrix._internal = valueMatrix;
        return matrix;

    }
    public getMatrix(): T[][] { 
        return this._internal;
    }
    public contains(needle: T): boolean {
        let matrix: T[][] = this.getMatrix();
        for (let i = 0; i < matrix.length; i++) {
            let row = matrix[i];
            for (let j = 0; j < row.length; j++) {
                let element = row[j];
                
                if (element === needle) {
                    return true;
                    
                }
    
            }
        }
        return false;
    }
    public bitwiseMatrixComparison(other: Matrix<number>, action: "and" | "or" | "xor"): Matrix<number> { 
        let result: number[][] = [];
        let a: number[][] = this.getMatrix() as number[][];
        let b: number[][] = other.getMatrix();
        if (action === "and") {
            for (let row = 0; row < a.length; row++) {
                result.push([]);
                for (let col = 0; col < a[row].length; col++) {
                    result[row][col] = a[row][col] && b[row][col];
                }
            }
        } else if (action === "or") {
            
            for (let row = 0; row < a.length; row++) {
                result.push([]);
                for (let col = 0; col < a[row].length; col++) {
                    result[row][col] = a[row][col] || b[row][col];
                }
            }
        } else if (action === "xor") {
            for (let row = 0; row < a.length; row++) {
                result.push([]);
                for (let col = 0; col < a[row].length; col++) {
                    result[row][col] = a[row][col] ^ b[row][col];
                    
                }
            }
        }
        return Matrix.from(result);
    }
}