
import { Game } from "./Game.js"


let app = new PIXI.Application({
    "antialias": false,
    "height": 560,
    "width": 1024,
    "backgroundColor": "#2f237f"
});
let game = new Game(app);

(globalThis as any).game = game;
(globalThis as any).__PIXI_APP__ = app;
document.body.appendChild(app.view as HTMLCanvasElement);
game.Init(true);
