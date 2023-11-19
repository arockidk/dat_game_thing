import { Hitbox } from "./Hitbox.js";
import { Player } from "./Player.js";
import { UserInputService } from "./UserInputService.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";
import { WorldObject } from "./WorldObject.js";


enum LoadType {
    JSON = "JSON",
    IMAGE = "IMAGE",
    TEXT = "TEXT",
};


export class Game {
    private _app: PIXI.Application;
    private _scene!: World;
    private _player!: Player;
    private a!: PIXI.Graphics;
    constructor(app: PIXI.Application) {
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
        console.log(player_sheet);
        
        // #endregion
        
        
        let player = new Player(
            new PIXI.Sprite(player_sheet['textures']['stand']),
            this._scene,
            new Vector2(0,0), 
            0,
            new Hitbox(
                28,24, 
                new Vector2(4,4)
            )
            
        );

        this._app.ticker.add(this.Update,this);
        this._app.stage.addChild(this._scene.getPixiObject()); 
        this._app.ticker.start();
        player.parent = this._scene;
        this._player = player;
        console.log(this._scene.getPixiObject());
        player.name = "Player";


    }
    private Input(deltaTime: number) {
        const speed = this._player.getSpeed();
        if (UserInputService.IsKeyDown("ArrowRight")) {
            console.log("e");
            this._player.velocity.x += (1 * speed * deltaTime);
        } else if (UserInputService.IsKeyDown("ArrowLeft")) { 
            this._player.velocity.x +=  (-1 *speed * deltaTime);
        } else {
            this._player.velocity.x = Math.abs(this._player.velocity.x) * 0.96 *(this._player.velocity.x < 0 ? -1 : 1);
        }
        if (UserInputService.IsKeyDown("ArrowUp")) {
            this._player.velocity.y = -1
        }
        // console.log(this._player)
    }
    private PreRender(deltaTime: number): void {
        this._player
    }

    private Physics(deltaTime: number): void {
        // Player movement
        this._player.moveX(this._player.velocity.x);
        

    }

    public Update(deltaFrame: number): void { 
        let deltaTime = (deltaFrame/  PIXI.Ticker.targetFPMS)/1000;
        this.Input(deltaTime);
        this.Physics(deltaTime);
    }

}