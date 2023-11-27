import Actor from "./Actor.js";
import { float, int } from "./typedef.js";
enum PLAYER_STATE { 
    IDLE,
    WALKING,
    FREEFALL
}


export class Player extends Actor {
    public className: string = "Player";
    protected _speed: number = 2;
    protected _state: PLAYER_STATE = PLAYER_STATE.IDLE;
    protected _walk_cycle: float = 0;
    protected _frames_since_movement_started: int = 0;
    public set speed(value: number) {
        this._speed = value;
    }
    
    public get speed(): number { return this._speed; }
    public get walk_cycle(): float { return this._walk_cycle; }
    public set walk_cycle(value: float) { this._walk_cycle = value; }
    public get state(): PLAYER_STATE { return this._state; }
    public set state(value: PLAYER_STATE) { this._state = value; }
    public get frames_since_movement_started(): number { return this._frames_since_movement_started; }
    public set frames_since_movement_started(value: number) { this._frames_since_movement_started = value; }

}