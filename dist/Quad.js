import Instance from "./Instance.js";
import { Vector2 } from "./Vector2.js";
/**
 * Axis aligned quad, meaning only squares and rectangles
 */
export default class Quad extends Instance {
    _hitbox;
    _textures;
    _sprites;
    _size;
    constructor(hitbox, size, parent, world) {
        super(parent, world);
        this._hitbox = hitbox;
        this._sprites = [
            [], [], [],
            [], [], [],
            [], [], []
        ];
        this._textures = [];
        this._size = size || new Vector2(hitbox._rect.getWidth(), hitbox._rect.getHeight());
    }
    getInnerWidth() {
        return this._hitbox._rect.getWidth() - this._textures[5][0].texture.width - this._textures[6][0].texture.width;
    }
    getInnerHeight() {
        return this._hitbox._rect.getHeight() - this._textures[5][0].texture.height - this._textures[7][0].texture.height;
    }
    getTextureLength(texture, side) {
        return texture.length || (side == 'vertical' ? this.getInnerHeight() : this.getInnerWidth());
    }
    getSprites() {
        let ret = [];
        for (let sprite of this._sprites) {
            ret.push(...sprite);
        }
        return ret;
    }
    setSideTextures(a, b, left, right) {
        if (left) {
            right = right;
            left = left;
            b = b;
            this._textures[0] = a;
            this._textures[1] = b;
            this._textures[2] = left;
            this._textures[3] = right;
        }
        else if (b) {
            this._textures[0] = a;
            this._textures[1] = a;
            this._textures[2] = b;
            this._textures[3] = b;
        }
        else {
            this._textures[0] = a;
            this._textures[1] = a;
            this._textures[2] = a;
            this._textures[3] = a;
        }
    }
    setBLTexture(texture) { this._textures[4] = [{ texture: texture }]; }
    setTLTexture(texture) { this._textures[5] = [{ texture: texture }]; }
    setTRTexture(texture) { this._textures[6] = [{ texture: texture }]; }
    setBRTexture(texture) { this._textures[7] = [{ texture: texture }]; }
    setCenterTexture(texture) { this._textures[8] = [{ texture: texture }]; }
    updateSpritePositions() {
        let rect = this._hitbox._rect;
        let bl = rect.getBL();
        let tr = rect.getTR();
        let width = rect.getWidth();
        let height = rect.getHeight();
        this._sprites[4][0].position = new Vector2(bl.x, bl.y - this._textures[4][0].texture.height);
        this._sprites[5][0].position = new Vector2(bl.x, tr.y);
        this._sprites[6][0].position = new Vector2(tr.x - this._textures[6][0].texture.width, tr.y);
        this._sprites[7][0].position = new Vector2(bl.x + width - this._textures[7][0].texture.width, tr.y + height - this._textures[7][0].texture.height);
        // Top
        for (let i = 0; i < this._sprites[0].length; i++) {
            let texture = this._textures[0][i];
            let sprite = this._sprites[0][i];
            sprite.position = new Vector2(bl.x + texture.texture.width + this.getTextureLength(texture, 'horizontal') / 2, tr.y + texture.texture.height / 2);
            console.log(sprite);
        }
        // Bottom
        for (let i = 0; i < this._sprites[1].length; i++) {
            let texture = this._textures[1][i];
            let sprite = this._sprites[1][i];
            console.log(bl, tr);
            sprite.position = new Vector2(bl.x + texture.texture.width + this.getTextureLength(texture, 'horizontal') / 2, bl.y - texture.texture.height / 2);
        }
        // Left
        for (let i = 0; i < this._sprites[2].length; i++) {
            let texture = this._textures[2][i];
            let sprite = this._sprites[2][i];
            sprite.position = new Vector2(bl.x + texture.texture.width / 2, tr.y + texture.texture.height + this.getTextureLength(texture, 'vertical') / 2);
        }
        // Right
        for (let i = 0; i < this._sprites[3].length; i++) {
            let texture = this._textures[3][i];
            let sprite = this._sprites[3][i];
            sprite.position = new Vector2(bl.x - texture.texture.width / 2 + this.getTextureLength(texture, 'horizontal') / 2 + this.getInnerWidth(), tr.y + texture.texture.height + this.getTextureLength(texture, 'vertical') / 2);
        }
        // Center
        {
            this._sprites[8][0].position = new Vector2(bl.x + this._sprites[2][0].width + this.getInnerWidth() / 2, tr.y + this._sprites[0][0].height + this.getInnerHeight() / 2);
        }
    }
    createSprites() {
        let rect = this._hitbox._rect;
        let bl = rect.getBL();
        let tr = rect.getTR();
        let width = rect.getWidth();
        let height = rect.getHeight();
        // #region Delete current sprites
        for (let i = 0; i < this._sprites.length; i++) {
            if (this._sprites[i]) {
                for (let j = 0; j < this._sprites[i].length; j++) {
                    let sprite = this._sprites[i][j];
                    sprite.destroy();
                    delete this._sprites[i][j];
                    ;
                }
            }
        }
        // #endregion
        // #region Corner sprites
        this._sprites[4][0] = new PIXI.Sprite(this._textures[4][0].texture);
        this._sprites[5][0] = new PIXI.Sprite(this._textures[5][0].texture);
        this._sprites[6][0] = new PIXI.Sprite(this._textures[6][0].texture);
        this._sprites[7][0] = new PIXI.Sprite(this._textures[7][0].texture);
        // #endregion
        // #region Side sprites
        // Top
        for (let texture of this._textures[0]) {
            let sprite = new PIXI.TilingSprite(texture.texture);
            sprite.anchor.set(0.5, 0.5);
            sprite.width = texture.length || this.getInnerWidth();
            sprite.height = texture.texture.height;
            this._sprites[0].push(sprite);
        }
        // Bottom
        for (let texture of this._textures[1]) {
            let sprite = new PIXI.TilingSprite(texture.texture);
            sprite.anchor.set(0.5, 0.5);
            sprite.width = texture.length || this.getInnerWidth();
            sprite.height = texture.texture.height;
            this._sprites[1].push(sprite);
        }
        // Left
        for (let texture of this._textures[2]) {
            let sprite = new PIXI.TilingSprite(texture.texture);
            sprite.anchor.set(0.5, 0.5);
            sprite.angle = 180;
            sprite.height = texture.length || this.getInnerHeight();
            sprite.width = texture.texture.height;
            this._sprites[2].push(sprite);
        }
        // Right
        for (let texture of this._textures[3]) {
            let sprite = new PIXI.TilingSprite(texture.texture);
            sprite.anchor.set(0.5, 0.5);
            sprite.angle = 180;
            sprite.height = texture.length || this.getInnerHeight();
            sprite.width = texture.texture.height;
            this._sprites[3].push(sprite);
        }
        // #endregion
        // #region Center sprite
        {
            let sprite = new PIXI.TilingSprite(this._textures[4][0].texture);
            sprite.anchor.set(0.5, 0.5);
            sprite.width = this.getInnerWidth();
            sprite.height = this.getInnerHeight();
            this._sprites[8][0] = sprite;
        }
        // #endregion Center sprite
        this.updateSpritePositions();
    }
    getHitbox() { return this._hitbox; }
    setHitbox(value) { this._hitbox = value; }
    get size() {
        return this._size;
    }
    set size(v) {
        this._size = v;
    }
}
//# sourceMappingURL=Quad.js.map