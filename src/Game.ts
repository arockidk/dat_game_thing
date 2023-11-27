import { Hitbox } from "./Hitbox.js";
import { Player } from "./Player.js";
import Quad from "./Quad.js";
import { UserInputService } from "./UserInputService.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";
import { WorldObject } from "./WorldObject.js";
import { float } from "./typedef.js";


enum LoadType {
    JSON = "JSON",
    IMAGE = "IMAGE",
    TEXT = "TEXT",
};

interface App {
    renderer: PIXI.Renderer;
    stage: PIXI.Container;
}
export class Game {
    private _app: App;
    private _scene!: World;
    private _player!: Player;
    private _player_sheet!: PIXI.Spritesheet;
    private _start!: float;
    private _test_tile!: WorldObject;
    private _test_quad!: Quad
    constructor(app: App) {
        this._app = app;
        console.log(this._app)
    }

    public async LoadJSON<T>(path: string): Promise<T>
    { 
        return await(await fetch(path)).json();
    } 
    public async LoadImage(path: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve: (img: HTMLImageElement) => void, reject: (reason: any) => void)=>{
            let image: HTMLImageElement = new Image();
            image.src = path;
            image.onload = () => resolve(image) ;
        })

        
    }
    public async LoadText(path: string): Promise<string>{
        return await(await fetch(path)).text();
    }
    public async Load(
        items: {    
            path: string,
            load_type: LoadType,
            id: string
        }[], 
        cb: (loaded: Map<string,any>) => void
    ) {
        let loaded: Map<string,any> = new Map();
        for (let item of items) { 
            switch (item.load_type) { 
                case LoadType.IMAGE: 
                    loaded.set(item.id,await this.LoadImage(item.path))
                    break;
                case LoadType.JSON:
                    loaded.set(item.id,await this.LoadJSON<object>(item.path))
                    break; 
                case LoadType.TEXT:
                    loaded.set(item.id,await this.LoadText(item.path))
                    break; 
            }
        }
        cb(loaded);
    }
    public async Init(pre_load: boolean): Promise<void> { 
        this._scene = new World(new PIXI.Container());
        UserInputService.Initialize();
        
        this.Load(await this.LoadJSON<{    
            path: string,
            load_type: LoadType,
            id: string
        }[]>('/resources/pre_load.json'), this.Run.bind(this));
    }

    public async Run(loaded: Map<string,any>): Promise<void> {
        console.log("EE")
        // #region Sprite setup
        let player_sheet: PIXI.Spritesheet = await PIXI.Assets.load('resources/sprites/Cat.json');
        await player_sheet.parse();
        this._player_sheet = player_sheet;
        let terrain_sheet: PIXI.Spritesheet = await PIXI.Assets.load('resources/sprites/TerrainOverworld.json');
        await terrain_sheet.parse();
        console.log(player_sheet);
        
        // #endregion
        
        
        let player = new Player(
            new PIXI.Sprite(player_sheet['textures']['stand']),
            this._scene,
            new Vector2(0,0), 
            0,
            new Hitbox(
                24,40,
                new Vector2(0,0)
            )
            
        );
        player.setHitboxOffset(new Vector2(-16,-4));
        player.pixi_object

        this._app.stage.addChild(this._scene.pixi_object); 
        player.parent = this._scene;
        this._player = player;
        console.log(this._scene.pixi_object);
        player.name = "Player";
        for (let i = 0; i < 40; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(40 + i * 32,120), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(40 + i * 32,120)
                )
    
            )
            block.parent = this._scene;
            console.log((block.pixi_object as PIXI.Sprite).anchor)
        }
        new WorldObject(
            new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
            this._scene,
            new Vector2(240,88), 
            0,
            new Hitbox(
                32,
                32, 
                new Vector2(240,88)
            ),
            

        );
        let a = new WorldObject(
            new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
            this._scene,
            new Vector2(240,56), 
            0,
            new Hitbox(
                32,
                32, 
                new Vector2(240,56)
            ),
            

        )
        a.parent = this._scene;
        this._test_tile = a;
        for (let i = 0; i < 40; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['dirt_tile']),
                this._scene,
                new Vector2(40 + i * 32,152), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(40 + i * 32,152)
                )
    
            )
            block.parent = this._scene;
            console.log((block.pixi_object as PIXI.Sprite).anchor)
        }
        this._start = Date.now();
        requestAnimationFrame(this.Update.bind(this));
        let quad = new Quad(new Hitbox(48,48,120,120));
        quad.setTLTexture(terrain_sheet['textures']['multi_a']);
        quad.setBLTexture(terrain_sheet['textures']['multi_a']);
        quad.setTRTexture(terrain_sheet['textures']['multi_a']);
        quad.setBRTexture(terrain_sheet['textures']['multi_a']);
        quad.setCenterTexture(terrain_sheet['textures']['multi_a']);
        quad.setSideTextures(
            [{texture: terrain_sheet['textures']['multi_b']}]
        );
        quad.createSprites();
        quad.parent = this._scene;

    }
    private Input(deltaTime: number) {
        const speed = this._player.speed;
        if (UserInputService.IsKeyDown("ArrowRight") || UserInputService.IsKeyDown("ArrowLeft")) {
            this._player.frames_since_movement_started++;
            this._player.walk_cycle += Math.min(Math.abs(this._player.velocity.x)/3,2);
            // console.log(this._player.frames_since_movement_started);
        }
        if (UserInputService.IsKeyDown("ArrowRight")) {

            this._player.pixi_object.scale.x = -1;
            this._player.velocity.x += (1 * speed * deltaTime);
        } else if (UserInputService.IsKeyDown("ArrowLeft")) { 
            this._player.pixi_object.scale.x = 1;
            this._player.velocity.x +=  (-1 *speed * deltaTime);
        } else {
            this._player.frames_since_movement_started = -1;
            this._player.velocity.x = Math.abs(this._player.velocity.x) * 0.80 *(this._player.velocity.x < 0 ? -1 : 1);
        }
        if (UserInputService.IsKeyDown("ArrowUp")) {
            this._player.velocity.y = -6;
        }
        this._player.velocity.y += 0.5;
        // console.log(this._player)
    }
    private PreRender(deltaTime: number): void {
        if (this._player.frames_since_movement_started > 0) {
            this._player.pixi_object.texture = this._player_sheet.textures[`walk${(Math.floor(this._player.walk_cycle / 4 ) % 4 )+ 1}`]
        } else {
            if (Math.abs(this._player.velocity.x) > 0.4 ) {
                this._player.pixi_object.texture = this._player_sheet.textures['walk2'];
            }
            else {
                this._player.pixi_object.texture = this._player_sheet.textures["stand"];
            }
            
        }
        
    }

    private Physics(deltaTime: number): void {
        // Player movement
        this._player.moveX(this._player.velocity.x);
        this._player.moveY(this._player.velocity.y);
        

    }
    private Render(deltaTime: number): void { 
        this._app.renderer.clear();
        for (let obj of this._scene.getChildren()) {
            // console.log(obj) 
            if (obj instanceof WorldObject) {
                this._app.renderer.render(
                    obj.pixi_object,
                    {
                        "clear" : false,
                    }
                );
            } else if (obj instanceof Quad) { 
                for (let i = 0; i < obj.getSprites().length; i++) {
                    let sprite = obj.getSprites()[i];
                    this._app.renderer.render(
                        sprite,
                        {
                            "clear" : false,
                        }
                    );

                }
            }
            
        }
        

    }

    public Update(): void { 
        let current = Date.now()
        let deltaTime = (current - this._start)/1000;

        this.Input(deltaTime);
        this.Physics(deltaTime);
        this.PreRender(deltaTime);
        this.Render(deltaTime);

        this._start = current;
        requestAnimationFrame(this.Update.bind(this));
    }

}