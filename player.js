import {Entities} from "./entities.js";
import {Rocket} from "./rocket.js";
import {gameManager, physicManager, spriteManager,} from "./globals.js";

export class Player extends Entities {
    constructor() {
        super();
        this.lifetime = 100;
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 2;
        this.draw = function(ctx){

            spriteManager.drawSprite(ctx, "hero_up", this.pos_x, this.pos_y)
        }
        this.update = function(){
            physicManager.update(this)
        }
        this.onTouchEntity=function(obj){

            if(obj.name.match(/star[\d]/)){
                //let life = document.getElementById("lifetime")
                //console.log(obj.name)
                this.lifetime += 50;
                //life.innerHTML = this.lifetime.toString()
                obj.kill();
            }
        }
        this.kill = function(){
            gameManager.kill(this)
        }
        this.fire = function(){
           // console.log("fireeee")
             let r = new Rocket()
            r.size_x = 16;
            r.size_y = 16;
            r.name = "rocket"+(++gameManager.fireNum);
            r.move_x = this.move_x;
            r.move_y = this.move_y;

            switch(this.move_x +2*this.move_y){
                case -1:
                    r.pos_x = this.pos_x - r.size_x;
                    r.pos_y = this.pos_y;
                    break;
                case 1:
                    r.pos_x = this.pos_x + this.size_x;
                    r.pos_y = this.pos_y;
                    break;
                case -2:
                    r.pos_x = this.pos_x;
                    r.pos_y = this.pos_y - r.size_y;
                    break;
                case 2:
                    r.pos_x = this.pos_x;
                    r.pos_y = this.pos_y + this.size_y;
                    break;
            }
             gameManager.entities.push(r);
        }

    }
}








// let player = new Player()
// console.log(player)