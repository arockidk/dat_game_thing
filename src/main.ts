
import { Game } from "./Game.js"


const app = {
    renderer: new PIXI.Renderer({
        "antialias": false,
        "height": 480,
        "width": 720,
        "backgroundColor": "#2f237f"
    }),
    stage: new PIXI.Container()
};
let game = new Game(app);
window.onload = () => {
    let ctx = app.renderer.view.getContext('2d') as CanvasRenderingContext2D;
    ctx.rect(38,104,30,30);
    ctx.strokeStyle = "black";
    ctx.fill();
}

(globalThis as any).game = game;
(globalThis as any).__PIXI_STAGE__ = app.stage;
(globalThis as any).__PIXI_RENDERER__ = app.renderer;
document.getElementById('game')?.appendChild(app.renderer.view as HTMLCanvasElement);
game.Init(true);
