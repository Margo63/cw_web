import {Player} from "../model/player.js";
import {Enemy} from "../model/enemy.js";
import {Bonus} from "../model/bonus.js";
import {Rocket} from "../model/rocket.js";
import {Guard} from "../model/guard.js";
import {mapManager, eventsManager, gameManager, spriteManager, ctx, canvas} from "../globals.js";


export class GameManager {
    constructor() {
        this.factory = {}
        this.entities = [];
        this.fireNum = 0;
        this.player = null;
        this.laterKill = [];
        this.interval = null;
        this.FIRE_AMOUNT = 5;
    }

    initPlayer(obj) {
        this.player = obj;
    }

    kill(obj) {
        this.laterKill.push(obj)
    }

    update() {
        let cookies = 0;
        if (this.player === null)
            return;

        this.player.move_x = 0;
        this.player.move_y = 0;


        if (eventsManager.action["up"]) {
            this.player.move_y = -1
            this.player.move_x = 0
        }
        if (eventsManager.action["down"]) {
            this.player.move_y = 1
            this.player.move_x = 0
        }
        if (eventsManager.action["left"]) {
            this.player.move_x = -1
            this.player.move_y = 0
        }
        if (eventsManager.action["right"]) {
            this.player.move_x = 1
            this.player.move_y = 0
        }


        if (eventsManager.action["fire"]) this.player.fire();

        this.entities.forEach(function (e) {
            try {
                // if(e.move_x === 1)
                //console.log("right")
                //console.log(e)

                e.update();
            } catch (ex) {

            }
        });
        for (var i = 0; i < this.laterKill.length; i++) {
            var idx = this.entities.indexOf(this.laterKill[i]);
            if (idx > -1)
                this.entities.splice(idx, 1);
        };
        if (this.laterKill.length > 0) {
            this.laterKill.length = 0;
        }
        mapManager.draw(ctx);
        mapManager.centerAt(this.player.pos_x, this.player.pos_y);
        this.draw(ctx);

        this.entities.forEach((e) => {
            if (e.name.match(/star[\d]/)) {
                cookies += 1;
            }
        });

        document.getElementById("lifetime").innerHTML =this.player.lifetime
        document.getElementById("cookies").innerHTML = cookies
        if(cookies === 0){
            clearInterval(this.interval);
            alert("Level pass")
            window.location=localStorage["next"]
        }
        if(this.player.lifetime <= 0){
            clearInterval(this.interval);
            alert("Level fail")
            window.location=localStorage["next"]
        }

    }

    draw(ctx) {
        //console.log("gM draw")
        for (let e = 0; e < this.entities.length; e++) {
            //console.log()
            this.entities[e].draw(ctx)
        }

    }

    loadAll(levelMap) {
        // var canvas = document.getElementById("canvasId");
        // var ctx = canvas.getContext("2d");

        mapManager.loadMap(levelMap);
        spriteManager.loadAtlas("../data/atlas.json", "../img/spritesheet.png");

        gameManager.factory['Player'] = Player;
        gameManager.factory["Enemy"] = Enemy;
        gameManager.factory["Guard"] = Guard;
        gameManager.factory["Bonus"] = Bonus;
        gameManager.factory["Rocket"] = Rocket;

        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventsManager.setup(canvas);

    }

    play() {
        this.interval = setInterval(updateWorld, 100);
    }
}

function updateWorld() {
    gameManager.update()
}