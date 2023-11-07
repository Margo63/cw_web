import {gameManager, mapManager} from "../globals.js";

export class PhysicManager {
    constructor() {
        this.SIZE = 16;
    }

    update(obj) {
        if (obj.move_x === 0 && obj.move_y === 0)
            return "stop";


        var newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        var newY = obj.pos_y + Math.floor(obj.move_y * obj.speed);

        var ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y / 2);
        var e = this.entityAtXY(obj, newX, newY);

        if (e !== null && obj.onTouchEntity) {
            //console.log("1")
            obj.onTouchEntity(e);
        }
        if (ts !== 22 && obj.onTouchMap) {
            //console.log("2")
            obj.onTouchMap(ts);
        }

        if (ts === 22 && e === null) {
            obj.pos_x = newX;
            obj.pos_y = newY;
            //if(obj.name.match(/player/))
            //console.log(obj.pos_y, obj.pos_x)
        } else {

            return "break";
        }
        return "move";
    }

    entityAtXY(obj, x, y) {
        for (var i = 0; i < gameManager.entities.length; i++) {
            var e = gameManager.entities[i];
            if (e.name !== obj.name) {
                if (x + obj.size_x < e.pos_x || y + obj.size_y < e.pos_y ||
                    x > e.pos_x + e.size_x || y > e.pos_y + e.size_y) {
                    continue;
                }
                return e;
            }
        }
        return null;
    }
}