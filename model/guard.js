import {Entities} from "./entities.js";
import {gameManager, physicManager, spriteManager} from "../globals.js";

export class Guard extends Entities {
    constructor() {
        super();
        this.lifetime = 100;
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 1;
        this.move = true;
        this.STEP_LEN = 48;
        this.len = 0;

        this.draw = function (ctx) {
            spriteManager.drawSprite(ctx, "enemy_down", this.pos_x, this.pos_y)
        }
        this.update = function () {
            if (this.len < this.STEP_LEN && this.move ) {
                this.len += 1;
                this.move_x = 1;
            }
            if (!this.move && this.len < this.STEP_LEN) {
                this.len += 1;
                this.move_x = -1;
            }
            if (this.len === this.STEP_LEN) {
                this.len = 0;
                this.move_x = 0;
                this.move = !this.move;
            }
            physicManager.update(this)
        }
        this.onTouchEntity = function (obj) {
            obj.kill()
        }
        this.onTouchMap = function (idx) {
            this.len = 0;
            this.move_x = 0;
            this.move_y = 0;
            this.move = !this.move;

            console.log("препятствие")


        }
        this.kill = function () {
            gameManager.kill(this)
        }
        this.fire = function () {

        }


    }
}