
import { Vector2 } from "./Vector2.js";
import { WorldObject } from "./WorldObject.js";

export class World extends WorldObject {
    public className: string = "World";
    public is_colliding(position: Vector2): boolean
    public is_colliding(obj: WorldObject): boolean
    public is_colliding(param: WorldObject | Vector2): boolean {
        let objects: WorldObject[] = [];
        for (const object of this.getChildren()) {
            if (param == object) continue;
            if (object instanceof WorldObject) {
                if (object.collidesWith(param)) {return true};
            }
        }
        return false;
    }
    public get_colliding_objects(obj: WorldObject): WorldObject[] {
        let objects: WorldObject[] = [];
        for (const object of this.getChildren()) {
            
            
            if (obj == object) continue;
            if (object instanceof WorldObject) {
                if (obj.collidesWith(object)) {objects.push(object);};
            }
        }
        return objects;
    }
}