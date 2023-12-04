import Camera from "./Camera.js";
import Enemy from "./Enemy.js";
import { Hitbox } from "./Hitbox.js";
import { Player } from "./Player.js";
import Quad from "./Quad.js";
import Rat from "./Rat.js";
import { UserInputService } from "./UserInputService.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";
import { WorldObject } from "./WorldObject.js";
import { float, int } from "./typedef.js";
import { rand } from "./Random.js";
import Collectible from "./Collectible.js";
import Cheese from "./Cheese.js";
import { multiplier, passed } from "./expfn.js";
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
    // private _cam: Camera;
    private _cam_x: number;
    private _cam_y: number;
    private _scene!: World;
    private _player!: Player;
    private _player_sheet!: PIXI.Spritesheet;
    private _start!: float;
    private _enemy_sheet!: PIXI.Spritesheet;
    private _collectible_sheet!: PIXI.Spritesheet;
    private points_text: PIXI.Text;
    private _break: boolean = false;
    private frames_since_start: int = 0;
    public  points: number;
    constructor(app: App) {
        this._app = app;
        this._cam_x = 0;
        this._cam_y = 0;
        this.points = 0;
        this.points_text = new PIXI.Text(this.points, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xffdd00,
            align: 'left',
        });
        console.log(this._app)
        // this._cam = new Camera(Vector2.ZERO);
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
        
        this.Run();
    }

    public async Run(loaded?: Map<string,any>): Promise<void> {
        console.log("EE")
        // #region Sprite setup
        let player_sheet: PIXI.Spritesheet = await PIXI.Assets.load('resources/sprites/Cat.json');
        await player_sheet.parse();
        this._player_sheet = player_sheet;
        let terrain_sheet: PIXI.Spritesheet = await PIXI.Assets.load('resources/sprites/TerrainOverworld.json');
        await terrain_sheet.parse();
        let enemy_sheet: PIXI.Spritesheet = await PIXI.Assets.load('resources/sprites/Rat.json');
        await enemy_sheet.parse();
        this._enemy_sheet = enemy_sheet;
        let collectible_sheet: PIXI.Spritesheet = await PIXI.Assets.load('resources/sprites/Cheese.json');
        await collectible_sheet.parse();
        this._collectible_sheet = collectible_sheet;
        console.log(player_sheet);
        
        // #endregion
        
        
        let player = new Player(
            new PIXI.Sprite(player_sheet['textures']['stand']),
            this._scene,
            new Vector2(60,170), 
            0,
            new Hitbox(
                24,40,
                new Vector2(60,170)
            )
            
        );
        player.setHitboxOffset(new Vector2(-16,-4));

        this._app.stage.addChild(this._scene.pixi_object); 
        player.parent = this._scene;
        this._player = player;
        console.log(this._scene.pixi_object);
        player.name = "Player";
        for (let i = 0; i < 4; i++) {
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

        for (let i = 0; i < 12; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(-30 + i * 32,220), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(-30 + i * 32,220)
                )
    
            )
            block.parent = this._scene;
            
        }
        
        for (let i = 0; i < 7; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(-400 + i * 32,270), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(-400 + i * 32,270)
                )
    
            )
            block.parent = this._scene;
            
        }
        for (let i = 0; i < 7; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(-100 + i * 32,320), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(-100 + i * 32,320)
                )
    
            )
            block.parent = this._scene;
            
        }
        for (let i = 0; i < 7; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(200 + i * 32,350), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(200 + i * 32,350)
                )
    
            )
            block.parent = this._scene;
            
        }
        for (let i = 0; i < 7; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(500 + i * 32,220), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(500 + i * 32,220)
                )
    
            )
            block.parent = this._scene;
            
        }
        for (let i = 0; i < 7; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(500 + i * 32,298), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(500 + i * 32,298)
                )
    
            )
            block.parent = this._scene;
            
        }
        for (let i = 0; i < 2; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(-120 + i * 32,150), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(-120 + i * 32,150)
                )
    
            )
            block.parent = this._scene;
            
        }
        for (let i = 0; i < 2; i++) {
            let block: WorldObject = new WorldObject(
                new PIXI.Sprite(terrain_sheet['textures']['grass_tile']),
                this._scene,
                new Vector2(-250 + i * 32,180), 
                0,
                new Hitbox(
                    32,
                    32, 
                    new Vector2(-250 + i * 32,180)
                )
    
            )
            block.parent = this._scene;
            
        }
        this._start = Date.now();
        this._player.onTouch.Connect((...objects: WorldObject[][]) => {
            let objs: WorldObject[][] = objects[0] as unknown as WorldObject[][];
            for (let obj of objs[0]) { 
                // console.log(obj);
                if (obj.className == "Rat") { 
                    
                    this._break = true;
                }
            }
        })
        requestAnimationFrame(this.Update.bind(this));

        
    } 
    private Input(deltaTime: number) {
        const speed = this._player.speed;
        if (UserInputService.IsKeyDown("ArrowRight") || UserInputService.IsKeyDown("ArrowLeft")) {
            this._player.frames_since_movement_started++;
            this._player.walk_cycle += Math.min(Math.abs(this._player.velocity.x)/3,2) * deltaTime * 50;
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
            if (this._player.airtime < 6) {
                this._player.velocity.y = -8;
                if (this._player.airtime < 2) { 
                    this._player.velocity.x *= 1.03;
                }
                
            }
            
        }
        
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
        this._player.airtime++;
        this._player.velocity.y += 0.5;
        // console.log(this._player.airtime)
        this._player.moveX(this._player.velocity.x,);
        this._player.moveY(this._player.velocity.y,()=>{
            if (this._player.velocity.y > 0) {
                this._player.airtime = 0;
                if (UserInputService.IsKeyDown("ArrowUp")) {
                    this._player.velocity.x *= 0.95;
                }
            }

        
        });
        // console.log(this._player.position);
        if (this._player.position.y > 1000) {
            this._break = true;
        }
        for (let obj of this._scene.getChildren()) {
            
            if (obj instanceof Rat) {
                // console.log(obj.velocity)
                obj.airtime++;
                obj.velocity.y += 0.5;
                obj.moveX(obj.velocity.x);
                obj.moveY(obj.velocity.y,()=>{
                    if (obj instanceof Rat) {
                        if (obj.velocity.y > 0) {
                            obj.airtime = 0;
                        }
                    }

                });
                
            }
        }
        

    }
    
    private Render(deltaTime: number): void { 
        this._cam_x = -this._player.position.x + 360;
        this._cam_y = -this._player.position.y + 240;
        this._app.renderer.clear();
        let offset: PIXI.Matrix = new PIXI.Matrix();
        offset.tx = this._cam_x;
        offset.ty = this._cam_y;
        for (let obj of this._scene.getChildren()) {
            
            if (obj instanceof WorldObject) {
                this._app.renderer.render(
                    obj.pixi_object,
                    {
                        "clear" : false,
                        "transform": offset
                    }
                );
            } else if (obj instanceof Quad) { 
                for (let i = 0; i < obj.getSprites().length; i++) {
                    let sprite = obj.getSprites()[i];
                    this._app.renderer.render(
                        sprite,
                        {
                            "clear" : false,
                            "transform": offset
                        }
                    );

                }
            }
            
        }
        this.points_text.text = `${this.points}`;
        this._app.renderer.render(this.points_text, {
            clear: false
        })

    }
    private Cheese() {
        
        console.log(Math.floor(70 / (multiplier() / 2)), multiplier() / 2);
        if (this.frames_since_start % Math.floor(70 / (multiplier() / 2)) == 0) {
            let pos = new Vector2(rand(-400,800), rand(80,300))
            let cheese = new Cheese(
                new PIXI.Sprite(this._collectible_sheet['textures']['main']),
                undefined,
                pos,
                0,
                new Hitbox(
                    16,
                    12,
                    pos.x - 16,
                    pos.y - 3
                )
            )
            cheese.setHitboxOffset(
                new Vector2(-16,0)
            )
            cheese.parent = this._scene;
            cheese.world = this._scene;
        }
    }
    private Enemy() {
        if (this.frames_since_start % Math.floor(70 / (multiplier() / 2)) == 0) {
            let rat = new Rat(
                new PIXI.Sprite(this._enemy_sheet['textures']['main']),
                undefined,
                new Vector2(rand(0,200), 0),
                0,
                new Hitbox(
                    16,
                    6,
                    0,
                    0
                )
            )
            rat.setHitboxOffset(
                new Vector2(-17,-21)
            )
            rat.onTouch.Connect((...objects: WorldObject[][]) => {
                let objs: WorldObject[][] = objects[0] as unknown as WorldObject[][];
                for (let obj of objs[0]) { 
                    // console.log(obj);
                    if (obj instanceof Player) { 
                        
                        this._break = true;

                    }

                }
            })
            rat.parent = this._scene;
            rat.world = this._scene;
            rat.lifetime = 400
            
        }
        for (let i = 0; i < this._scene.getChildren().length; i++) {
            let obj = this._scene.getChildren()[i]
            if (obj instanceof Enemy) {
                obj.lifetime--;
                
                if (obj.lifetime <= 0) {
                    obj.destroy();
                    delete this._scene.getChildren()[i];
                    
                } else {
                    obj.pathfind(this._player);
                    if (obj.velocity.x > 0) {
                        obj.pixi_object.scale.x = -1;
                    } else if (obj.velocity.x < 0) { 
                        obj.pixi_object.scale.x = 1;
                    }
                }


            }

        }
    }
    private PostPhysics () {
        
        for (let obj of this._scene.getTouchingObjects(this._player)) {
            console.log(obj)
            if (obj instanceof Collectible) { 
                obj.onCollect(this, this._player);
            }
        }
    }
    private End() {
        this._app.renderer.clear();
        this.points_text.style.align = 'center';
        let high_score = localStorage.getItem('high_score');
        if (!high_score) {
            high_score = this.points.toString();
            this.points_text.text = `You lost!\nCheese stolen: ${this.points_text.text}\nNew high score!`;
        } else {
            if (this.points > Number(high_score)) {
                this.points_text.text = `You lost!\nCheese stolen: ${this.points_text.text}\nNew high score!`;
                high_score = this.points.toString();
            } else {
                this.points_text.text = `You lost!\nCheese stolen: ${this.points_text.text}\nHigh score: ${high_score}.`;
            }
        }

        localStorage.setItem("high_score", high_score);
        
        this.points_text.scale.set(1,1);
        this.points_text.anchor.set(0.5,0.5)
        this.points_text.position.set(360,240) ;
        this._app.renderer.render(this.points_text);
    }
    public Update(): void { 
        let current = Date.now()
        let deltaTime = (current - this._start)/1000;
        
        this.Input(deltaTime);
        this.Enemy();
        this.Cheese();
        this.Physics(deltaTime);
        this.PostPhysics();
        this.PreRender(deltaTime);
    
        this.Render(deltaTime);

        this._start = current;
        this.frames_since_start++;
        if (this._break == false) {
            requestAnimationFrame(this.Update.bind(this));
        } else {
            this.End();
        }
        
    }

}