import {Entities} from "./entities.js";

export class Enemy extends Entities {
    constructor() {
        super();
        this.lifetime = 100;
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 1;
        this.draw = function(ctx){

        }
        this.update = function(){

        }
        this.onTouchEntity=function(obj){

        }
        this.kill = function(){

        }
        this.fire = function(){

        }

    }
}