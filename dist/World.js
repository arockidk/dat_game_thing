import Collectible from "./Collectible.js";
import { WorldObject } from "./WorldObject.js";
export class World extends WorldObject {
    className = "World";
    is_colliding(param) {
        let objects = [];
        for (const object of this.getChildren()) {
            if (param == object)
                continue;
            if (object instanceof WorldObject) {
                if (object.canCollide)
                    if (object.collidesWith(param)) {
                        return true;
                    }
                ;
            }
        }
        return false;
    }
    get_colliding_objects(obj) {
        let objects = [];
        for (const object of this.getChildren()) {
            if (obj == object)
                continue;
            if (object instanceof WorldObject) {
                if (object.canCollide)
                    if (obj.collidesWith(object)) {
                        objects.push(object);
                    }
                ;
            }
        }
        return objects;
    }
    getTouchingObjects(obj) {
        let objects = [];
        for (const object of this.getChildren()) {
            if (obj == object)
                continue;
            if (object instanceof WorldObject) {
                if (object instanceof Collectible) {
                }
                if (object.canTouch)
                    if (obj.collidesWith(object)) {
                        objects.push(object);
                    }
                ;
            }
        }
        return objects;
    }
}
//# sourceMappingURL=World.js.map