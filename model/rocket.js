import {Entities} from "./entities.js";
import {gameManager, physicManager, spriteManager} from "../globals.js";

export class Rocket extends Entities {
    constructor() {
        super();
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 4;
        this.draw = function(ctx){
            spriteManager.drawSprite(ctx, "arrow", this.pos_x, this.pos_y)
        }
        this.update = function(){
            //console.log("rocket update", this.move_x, this.move_y)
            physicManager.update(this)
        }
        this.onTouchEntity=function(obj){
            //console.log(obj.name)
            if(obj.name.match(/enemy[\d*]/) || obj.name.match(/player/) || obj.name.match(/rocket[\d*]/)){
                obj.kill();
            }
            this.kill()
        }
        this.onTouchMap = function(idx){
            this.kill();
        }
        this.kill = function(){
            gameManager.kill(this)
        }

    }
}