import {Entities} from "./entities.js";
import {gameManager, physicManager, spriteManager} from "./globals.js";

export class Enemy extends Entities {
    constructor() {
        super();
        this.lifetime = 100;
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 1;
        this.move = true;
        this.STEP_LEN = 150;
        this.ZONE_LEN = 100;
        this.playerFollow = false;
        this.isInStart = true;

        this.len = 0;
        this.draw = function (ctx) {
            spriteManager.drawSprite(ctx, "enemy_down", this.pos_x, this.pos_y)
        }
        this.update = function () {
            this.checkForPlayer();
            physicManager.update(this)
        }
        this.onTouchEntity = function (obj) {
            if (obj.name.match(/player/)) {
                console.log("enemy touch player")
            } else {
                this.len = 0;
                this.move_x = 0;
                this.move = !this.move;
            }


        }
        this.onTouchMap = function (idx) {

            if (!this.playerFollow) {
                if (this.isInStart) {
                    this.len = 0;
                    this.move_x = 0;
                    this.move_y = 0;
                    this.move = !this.move;
                } else {
                    this.A_star(this.start_x, this.start_y)
                }


            } else {
                this.A_star(gameManager.player.pos_x, gameManager.player.pos_y)


                console.log("препятствие")
            }

        }
        this.kill = function () {
            gameManager.kill(this)
        }
        this.fire = function () {

        }

        this.checkForPlayer = function () {
            if (gameManager.player.pos_x < this.pos_x + this.ZONE_LEN && gameManager.player.pos_x > this.pos_x - this.ZONE_LEN &&
                gameManager.player.pos_y < this.pos_y + this.ZONE_LEN && gameManager.player.pos_y > this.pos_y - this.ZONE_LEN
            ) {
                this.playerFollow = true;
                this.isInStart = false;
                this.len = 0;
                //console.log("zonenenen")

                if (this.pos_x > gameManager.player.pos_x) {
                    this.move_x = -1;
                    this.move_y = 0
                    return;
                    // console.log("this.move_x = -1;")
                }
                if (this.pos_x < gameManager.player.pos_x) {
                    this.move_x = 1;
                    this.move_y = 0
                    //console.log("this.move_x = 1;")
                    return;
                }
                if (this.pos_y > gameManager.player.pos_y) {
                    this.move_y = -1;
                    this.move_x = 0
                    return;
                    //console.log("this.move_y = -1;")
                }
                if (this.pos_y < gameManager.player.pos_y) {
                    this.move_y = 1;
                    this.move_x = 0
                    return;
                    //console.log("this.move_y = 1;")
                }
                if (this.pos_x === gameManager.player.pos_x) this.move_x = 0;
                if (this.pos_y === gameManager.player.pos_y) this.move_y = 0;

                //this.move_x = 0;

            } else {
                this.playerFollow = false;

                if (this.isInStart) {
                    if (this.move && this.len < this.STEP_LEN) {
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
                } else {
                    //console.log("back home", this.start_x,  this.start_y)
                    if (this.pos_x > this.start_x) {
                        this.move_x = -1;
                        return;
                    }
                    if (this.pos_x < this.start_x) {
                        this.move_x = 1;
                        return;
                    }
                    if (this.pos_y > this.start_y) {
                        this.move_y = -1;
                        return;
                    }
                    if (this.pos_y < this.start_y) {
                        this.move_y = 1;
                        return;
                    }
                    if (this.pos_x === this.start_x) this.move_x = 0;
                    if (this.pos_y === this.start_y) this.move_y = 0;
                    if (this.pos_x === this.start_x && this.pos_y === this.start_y) {
                        this.isInStart = true;
                        // this.move_x = 0;
                        // this.move_y = 0;
                    }


                }


            }
        }

        this.A_star = function (dest_x, dest_y) {
            console.log(this.move_y, this.move_x)
            if (this.move_x !== 0) {

                this.move_x = 0;
                if (this.pos_y >= dest_y) this.move_y = -1;
                if (this.pos_y < dest_y) this.move_y = -1;
                console.log("upppp")
                physicManager.update(this);
                return;
            }
            if (this.move_y !== 0) {

                this.move_y = 0;
                if (this.pos_x >= dest_x) this.move_x = -1;
                if (this.pos_x < dest_x) this.move_x = -1;
                console.log("levo")
                physicManager.update(this);
            }


            //
            // if (this.pos_x < dest_x) {
            //     this.move_x = 1;
            //     console.log("this.move_x = 1;")
            // }
            // if (this.pos_y >= dest_y) {
            //     this.move_y = -1;
            // }
            // if (this.pos_y < dest_y) {
            //     this.move_y = 1;
            // }

        }

    }
}