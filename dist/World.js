import { WorldObject } from "./WorldObject.js";
export class World extends WorldObject {
    className = "World";
    is_colliding(param) {
        let objects = [];
        for (const object of this.getChildren()) {
            if (param == object)
                continue;
            if (object instanceof WorldObject) {
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