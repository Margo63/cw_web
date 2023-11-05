import {Entities} from "./entities.js";
import {physicManager} from "./globals";

export class Rocket extends Entities {
    constructor() {
        super();
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 4;
        this.draw = function(ctx){

        }
        this.update = function(){
            physicManager.update()
        }
        this.onTouchEntity=function(obj){
            console.log(obj.name)
            if(obj.name.match(/enemy[\d*]/) || obj.name.match(/player/) || obj.name.match(/rocket[\d*]/)){
                obj.kill();
            }
            this.kill()
        }
        this.onTouchMap = function(idx){
            this.kill();
        }
        this.kill = function(){

        }

    }
}