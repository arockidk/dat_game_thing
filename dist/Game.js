import { Hitbox } from "./Hitbox.js";
import { Player } from "./Player.js";
import { UserInputService } from "./UserInputService.js";
import { Vector2 } from "./Vector2.js";
import { World } from "./World.js";
var LoadType;
(function (LoadType) {
    LoadType["JSON"] = "JSON";
    LoadType["IMAGE"] = "IMAGE";
    LoadType["TEXT"] = "TEXT";
})(LoadType || (LoadType = {}));
;
export class Game {
    _app;
    _scene;
    _player;
    a;
    constructor(app) {
        this._app = app;
        console.log(this._app);
    }
    async LoadJSON(path) {
        return await (await fetch(path)).json();
    }
    async LoadImage(path) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.src = path;
            image.onload = () => resolve(image);
        });
    }
    async LoadText(path) {
        return await (await fetch(path)).text();
    }
    async Load(items, cb) {
        let loaded = new Map();
        for (let item of items) {
            switch (item.load_type) {
                case LoadType.IMAGE:
                    loaded.set(item.id, await this.LoadImage(item.path));
                    break;
                case LoadType.JSON:
                    loaded.set(item.id, await this.LoadJSON(item.path));
                    break;
                case LoadType.TEXT:
                    loaded.set(item.id, await this.LoadText(item.path));
                    break;
            }
        }
        cb(loaded);
    }
    async Init(pre_load) {
        this._scene = new World(new PIXI.Container());
        UserInputService.Initialize();
        this.Load(await this.LoadJSON('/resources/pre_load.json'), this.Run.bind(this));
    }
    async Run(loaded) {
        console.log("EE");
        // #region Sprite setup
        let player_sheet = await PIXI.Assets.load('resources/sprites/Cat.json');
        await player_sheet.parse();
        console.log(player_sheet);
        // #endregion
        let player = new Player(new PIXI.Sprite(player_sheet['textures']['stand']), this._scene, new Vector2(0, 0), 0, new Hitbox(28, 24, new Vector2(4, 4)));
        this._app.ticker.add(this.Update, this);
        this._app.stage.addChild(this._scene.getPixiObject());
        this._app.ticker.start();
        player.parent = this._scene;
        this._player = player;
        console.log(this._scene.getPixiObject());
        player.name = "Player";
    }
    Input(deltaTime) {
        const speed = this._player.getSpeed();
        if (UserInputService.IsKeyDown("ArrowRight")) {
            console.log("e");
            this._player.velocity.x += (1 * speed * deltaTime);
        }
        else if (UserInputService.IsKeyDown("ArrowLeft")) {
            this._player.velocity.x += (-1 * speed * deltaTime);
        }
        else {
            this._player.velocity.x = Math.abs(this._player.velocity.x) * 0.96 * (this._player.velocity.x < 0 ? -1 : 1);
        }
        if (UserInputService.IsKeyDown("ArrowUp")) {
            this._player.velocity.y = -1;
        }
        // console.log(this._player)
    }
    PreRender(deltaTime) {
        this._player;
    }
    Physics(deltaTime) {
        // Player movement
        this._player.moveX(this._player.velocity.x);
    }
    Update(deltaFrame) {
        let deltaTime = (deltaFrame / PIXI.Ticker.targetFPMS) / 1000;
        this.Input(deltaTime);
        this.Physics(deltaTime);
    }
}
//# sourceMappingURL=Game.js.map