import Actor from "./Actor.js";
var PLAYER_STATE;
(function (PLAYER_STATE) {
    PLAYER_STATE[PLAYER_STATE["IDLE"] = 0] = "IDLE";
    PLAYER_STATE[PLAYER_STATE["WALKING"] = 1] = "WALKING";
    PLAYER_STATE[PLAYER_STATE["FREEFALL"] = 2] = "FREEFALL";
})(PLAYER_STATE || (PLAYER_STATE = {}));
export class Player extends Actor {
    airtime = 0;
    className = "Player";
    _speed = 2;
    _state = PLAYER_STATE.IDLE;
    _walk_cycle = 0;
    _frames_since_movement_started = 0;
    set speed(value) {
        this._speed = value;
    }
    get speed() { return this._speed; }
    get walk_cycle() { return this._walk_cycle; }
    set walk_cycle(value) { this._walk_cycle = value; }
    get state() { return this._state; }
    set state(value) { this._state = value; }
    get frames_since_movement_started() { return this._frames_since_movement_started; }
    set frames_since_movement_started(value) { this._frames_since_movement_started = value; }
}
//# sourceMappingURL=Player.js.map