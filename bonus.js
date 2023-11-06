import {Entities} from "./entities.js";
import {gameManager, spriteManager} from "./globals.js";

export class Bonus extends Entities {
    constructor() {
        super();
        this.draw = function(ctx){

            spriteManager.drawSprite(ctx, "star", this.pos_x, this.pos_y)
        }
        this.kill = function(){
            gameManager.kill(this)
        }

    }
}