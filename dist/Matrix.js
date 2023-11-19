import { Vector2 } from "./Vector2.js";
export class Matrix {
    _internal = [];
    _size = Vector2.ZERO;
    height = 0;
    width = 0;
    get size() {
        return this._size;
    }
    set size(v) {
        this.height = v.y;
        this.width = v.x;
        this._size = v;
    }
    constructor(var1, var2) {
        if (var2) {
            return new Matrix(new Vector2(var1, var2));
        }
        else {
            this.size = var1;
        }
    }
    static from(valueMatrix) {
        let height = valueMatrix.length;
        let width = 0;
        if (height > 0) {
            width = valueMatrix[0].length;
        }
        let matrix = new Matrix(width, height);
        matrix._internal = valueMatrix;
        return matrix;
    }
    getMatrix() {
        return this._internal;
    }
    contains(needle) {
        let matrix = this.getMatrix();
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
    bitwiseMatrixComparison(other, action) {
        let result = [];
        let a = this.getMatrix();
        let b = other.getMatrix();
        if (action === "and") {
            for (let row = 0; row < a.length; row++) {
                result.push([]);
                for (let col = 0; col < a[row].length; col++) {
                    result[row][col] = a[row][col] && b[row][col];
                }
            }
        }
        else if (action === "or") {
            for (let row = 0; row < a.length; row++) {
                result.push([]);
                for (let col = 0; col < a[row].length; col++) {
                    result[row][col] = a[row][col] || b[row][col];
                }
            }
        }
        else if (action === "xor") {
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
//# sourceMappingURL=Matrix.js.map