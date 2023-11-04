import {Entities} from "./entities.js";

export class Rocket extends Entities {
    constructor() {
        super();
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 4;
        this.draw = function(ctx){

        }
        this.update = function(){

        }
        this.onTouchEntity=function(obj){

        }
        this.onTouchMap = function(idx){

        }
        this.kill = function(){

        }

    }
}