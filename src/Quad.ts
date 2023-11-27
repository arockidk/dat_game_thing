
import { Hitbox } from "./Hitbox.js";
import Instance from "./Instance.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";
import { int } from "./typedef.js";
interface QuadTexture {
    length?: int;
    texture: PIXI.Texture;
}
/**
 * Axis aligned quad, meaning only squares and rectangles
 */
export default class Quad extends Instance {
    protected _hitbox: Hitbox;
    protected _textures: QuadTexture[][];
    protected _sprites: PIXI.Sprite[][];
    
    protected _size : Vector2;

    
    public constructor(hitbox: Hitbox, size?: Vector2, parent?: Instance, world?: World) {
        super(parent, world);
        this._hitbox = hitbox;
        this._sprites = [
            [], [], [],
            [], [], [],
            [], [], []
        ];
        this._textures = [];
        this._size = size || new Vector2(hitbox._rect.getWidth(),hitbox._rect.getHeight());
    }

    protected getInnerWidth(): int {
        return this._hitbox._rect.getWidth() - this._textures[5][0].texture.width - this._textures[6][0].texture.width;
    }
    protected getInnerHeight(): int {
        return this._hitbox._rect.getHeight() - this._textures[5][0].texture.height - this._textures[7][0].texture.height;
    } 
    protected getTextureLength(texture: QuadTexture, side: 'vertical' | 'horizontal'): int {
            return texture.length || (side == 'vertical' ? this.getInnerHeight() : this.getInnerWidth());
    }
    public getSprites(): PIXI.Sprite[] {
        let ret: PIXI.Sprite[] = [];
        for (let sprite of this._sprites) {
            ret.push(...sprite);
        }
        return ret;
    }

    public setSideTextures(all: QuadTexture[]): void
    public setSideTextures(vert: QuadTexture[], hori: QuadTexture[]): void
    public setSideTextures(top: QuadTexture[], bottom: QuadTexture[], left: QuadTexture[], right: QuadTexture[]): void
    public setSideTextures(a: QuadTexture[], b?: QuadTexture[], left?: QuadTexture[], right?: QuadTexture[]): void {
        if (left) {
            right = right as QuadTexture[];
            left = left as QuadTexture[];
            b = b as QuadTexture[];
            this._textures[0] = a;
            this._textures[1] = b;
            this._textures[2] = left;
            this._textures[3] = right;
        } else if (b) {
            this._textures[0] = a;
            this._textures[1] = a;
            this._textures[2] = b;
            this._textures[3] = b;
        } else {
            this._textures[0] = a;
            this._textures[1] = a;
            this._textures[2] = a;
            this._textures[3] = a;
        }
    } 
    public setBLTexture(texture: PIXI.Texture): void { this._textures[4] = [{texture: texture}]; }
    public setTLTexture(texture: PIXI.Texture): void { this._textures[5] = [{texture: texture}]; }
    public setTRTexture(texture: PIXI.Texture): void { this._textures[6] = [{texture: texture}]; }
    public setBRTexture(texture: PIXI.Texture): void { this._textures[7] = [{texture: texture}]; }
    public setCenterTexture(texture: PIXI.Texture): void { this._textures[8] = [{texture: texture}]; }
    public updateSpritePositions(): void { 
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
            
            sprite.position = new Vector2(
                bl.x + texture.texture.width + this.getTextureLength(texture, 'horizontal') / 2, 
                tr.y + texture.texture.height / 2
            );
            console.log(sprite);
        }
        // Bottom
        for (let i = 0; i < this._sprites[1].length; i++) {
            let texture = this._textures[1][i];
            let sprite = this._sprites[1][i];
            console.log(bl,tr);
            sprite.position = new Vector2(
                bl.x + texture.texture.width + this.getTextureLength(texture, 'horizontal') / 2,
                bl.y - texture.texture.height / 2
            );
        }
        // Left
        for (let i = 0; i < this._sprites[2].length; i++) {
            let texture = this._textures[2][i];
            let sprite = this._sprites[2][i];

            sprite.position = new Vector2(
                bl.x + texture.texture.width / 2, 
                tr.y + texture.texture.height + this.getTextureLength(texture, 'vertical') / 2
            );
        }
        // Right
        for (let i = 0; i < this._sprites[3].length; i++) {
            let texture = this._textures[3][i];
            let sprite = this._sprites[3][i];

            sprite.position = new Vector2(
                bl.x - texture.texture.width / 2 + this.getTextureLength(texture, 'horizontal') / 2 + this.getInnerWidth(), 
                tr.y + texture.texture.height + this.getTextureLength(texture, 'vertical') / 2
            );
        }
        // Center
        {
            this._sprites[8][0].position = new Vector2(
                bl.x + this._sprites[2][0].width + this.getInnerWidth() / 2,
                tr.y + this._sprites[0][0].height + this.getInnerHeight() / 2
            )
        }
    }
    public createSprites(): void { 
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
                    delete this._sprites[i][j];;
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
            sprite.anchor.set(0.5,0.5)
            sprite.width = texture.length || this.getInnerWidth();
            sprite.height = texture.texture.height;
            this._sprites[0].push(sprite);
            
        }
        // Bottom
        for (let texture of this._textures[1]) {
            let sprite = new PIXI.TilingSprite(texture.texture);
            sprite.anchor.set(0.5,0.5)
            sprite.width = texture.length || this.getInnerWidth();
            sprite.height = texture.texture.height;
            this._sprites[1].push(sprite);
        }
        // Left
        for (let texture of this._textures[2]) {
            let sprite = new PIXI.TilingSprite(texture.texture);
            sprite.anchor.set(0.5,0.5)
            sprite.angle = 180;
            sprite.height = texture.length || this.getInnerHeight();
            sprite.width = texture.texture.height;
            this._sprites[2].push(sprite);
        }
        // Right
        for (let texture of this._textures[3]) {
            let sprite = new PIXI.TilingSprite(texture.texture);
            sprite.anchor.set(0.5,0.5)
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
    
    public getHitbox(): Hitbox { return this._hitbox; }
    public setHitbox(value: Hitbox) { this._hitbox = value; }
    public get size() : Vector2 {
        return this._size;
    }
    public set size(v : Vector2) {
        this._size = v;
    }
}