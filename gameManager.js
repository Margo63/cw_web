import {Player} from "./player.js";
import {Enemy} from "./enemy.js";
import {Bonus} from "./bonus.js";
import {Rocket} from "./rocket.js";
import {mapManager, eventsManager, gameManager, spriteManager, ctx} from "./globals.js";

export class GameManager{
    constructor() {
        this.factory = {}
        this.entities = [];
        this.fireNum = 0;
        this.player = null;
        this.laterKill=[];
    }
    initPlayer(obj){
        this.player = obj;
    }
    kill(obj){
        this.laterKill.push(obj)
    }
    update(){
        if(this.player === null)
            return;

        this.player.move_x = 0;
        this.player.move_y = 0;


        if(eventsManager.action["up"]) this.player.move_y = -1
        if(eventsManager.action["down"]) this.player.move_y = 1
        if(eventsManager.action["left"]) this.player.move_x = -1
        if(eventsManager.action["right"]){
            this.player.move_x = 1

        }



        if(eventsManager.action["fire"]) this.player.fire();

        this.entities.forEach(function (e){
            try{
                if(e.move_x === 1)
                    console.log("right")
               // console.log(e)
                e.update();
            }catch(ex){

            }
        });
        for(var i = 0; i<this.laterKill.length;i++ ){
            var idx = this.entities.indexOf(this.laterKill[i]);
            if(idx>-1)
                this.entities.splice(idx,1);
        };
        if(this.laterKill.length>0){
            this.laterKill.length = 0;
        }
        mapManager.draw(ctx);
        mapManager.centerAt(this.player.pos_x, this.player.pos_y);
        this.draw(ctx);
    }
    draw(ctx){
        //console.log("gM draw")
        for(let e = 0; e<this.entities.length; e++){
            //console.log()
            this.entities[e].draw(ctx)
        }

    }
    loadAll(){
        var canvas = document.getElementById("canvasId");
        var ctx = canvas.getContext("2d");

        mapManager.loadMap("tileMap.json");
        spriteManager.loadAtlas("atlas.json","img/hero_up.png");

        gameManager.factory['Player'] = new Player();
        gameManager.factory["Enemy"] = new Enemy();
        gameManager.factory["Bonus"] = new Bonus();
        gameManager.factory["Rocket"] = new Rocket();
        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventsManager.setup(canvas);

    }
    play(){
        setInterval(updateWorld, 100);
    }
}

function updateWorld(){
    gameManager.update()
}