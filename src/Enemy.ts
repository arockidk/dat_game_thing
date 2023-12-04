import Actor from "./Actor.js";
import Jumpable from "./Jumpable.js";
import { rand } from "./Random.js";
import { WorldObject } from "./WorldObject.js";
import { multiplier } from "./expfn.js";

export default class Enemy extends Actor implements Jumpable {
    public airtime: number = 0;
    public lifetime: number = 0;
    public pathfind(target: WorldObject) {
        let dir = target.position.sub(this.position);
        let nm = dir.normal();
        // console.log(dir)
        this.velocity.x = nm.x * Math.min(Math.max(dir.magnitude * 4,0), 4) / 10 * multiplier();
        if (nm.x == 0) {
            this.velocity.x = rand(-2,2);
        }
        if (dir.y < -40) {
            if (rand(0,20) == 0 && this.airtime < 2) {
                this.velocity.y = -4 * (1 + (multiplier() / 4));
                
            }
        }
        
    } 
}