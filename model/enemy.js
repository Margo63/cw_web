import {Entities} from "./entities.js";
import {gameManager, mapManager, physicManager, spriteManager} from "../globals.js";

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
        //this.isInStart = true;
        this.isMapObject = false;
        this.prep_x = 0;
        this.prep_y = 0;


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

                this.pos_x = this.start_x;
                this.pos_y = this.start_y;
                this.move_x = 0;
                this.move_y = 0;
                this.len = 0;
                obj.kill();
            } else {
                if(obj.name.match(/enemy[\d]/)){
                   // this.pos_x += Math.floor(this.move_x*this.speed)
                    //this.pos_y += Math.floor(this.move_y*this.speed)
                    //physicManager.update(this)
                    //return
                    this.pos_x = this.start_x;
                    this.pos_y = this.start_y;
                    this.move_x = 0;
                    this.move_y = 0;
                    this.len = 0;
                }
                this.len = 0;
                this.move_x = 0;
                this.move = !this.move;
            }


        }
        this.onTouchMap = function (idx) {

            if (!this.playerFollow) {
                this.len = 0;
                this.move_x = 0;
                this.move_y = 0;
                this.move = !this.move;

                // if (this.isInStart) {
                //     this.len = 0;
                //     this.move_x = 0;
                //     this.move_y = 0;
                //     this.move = !this.move;
                // } else {
                //     this.prep_x = this.move_x;
                //     this.prep_y = this.move_y;
                //     this.A_star(this.start_x, this.start_y)
                // }

            } else {
                this.prep_x = this.move_x;
                this.prep_y = this.move_y;
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
               // this.isInStart = false;
                this.len = 0;
                //console.log("zonenenen")

               // console.log(this.isMapObject)

                if(!this.isMapObject){
                    if (this.pos_x > gameManager.player.pos_x) {
                        this.move_x = -1;
                        //this.move_y = 0
                        //return;
                        // console.log("this.move_x = -1;")
                    }
                    if (this.pos_x < gameManager.player.pos_x) {
                        this.move_x = 1;
                       // this.move_y = 0
                        //console.log("this.move_x = 1;")
                        //return;
                    }
                    if (this.pos_y > gameManager.player.pos_y) {
                        this.move_y = -1;
                        // this.move_x = 0
                        // return;
                        //console.log("this.move_y = -1;")
                    }
                    if (this.pos_y < gameManager.player.pos_y) {
                        this.move_y = 1;
                        // this.move_x = 0
                        // return;
                        //console.log("this.move_y = 1;")
                    }
                    if (this.pos_x === gameManager.player.pos_x) this.move_x = 0;
                    if (this.pos_y === gameManager.player.pos_y) this.move_y = 0;


                }else {
                    if(//this.prep_x!==0 &&
                        mapManager.getTilesetIdx(
                            this.pos_x + Math.floor(this.prep_x * this.speed)+this.size_x/2,
                            this.pos_y + Math.floor(this.prep_y * this.speed)+this.size_y/2)===22 &&
                        mapManager.getTilesetIdx(
                            this.pos_x + Math.floor(this.move_x * this.speed)+this.size_x/2,
                            this.pos_y + Math.floor(this.move_y * this.speed)+this.size_y/2)===22
                    ){
                        this.isMapObject = false;
                        //console.log("oke")
                    }
                    //
                    // if(mapManager.getTilesetIdx(
                    //         this.pos_x + Math.floor(this.prep_x * this.speed)+this.size_x/2,
                    //         this.pos_y + Math.floor(this.prep_y * this.speed)+this.size_y/2)===22 &&
                    //     mapManager.getTilesetIdx(
                    //         this.pos_x + Math.floor(this.move_x * this.speed),
                    //         this.pos_y + Math.floor(this.move_y * this.speed))===22
                    // ){
                    //     //this.pos_y+= Math.floor(this.prep_x * this.speed)
                    //     this.isMapObject = false;
                    //
                    // }

                    //this.A_star(gameManager.player.pos_x, gameManager.player.pos_y)
                }





                //this.move_x = 0;

            } else {
                if(this.playerFollow){
                    this.move_x = 0;
                    this.move_y = 0;
                    this.len = 0;
                    this.playerFollow = false;
                }

                //туда-сюда
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

                // if (this.isInStart) {
                //     if (this.move && this.len < this.STEP_LEN) {
                //         this.len += 1;
                //         this.move_x = 1;
                //     }
                //
                //     if (!this.move && this.len < this.STEP_LEN) {
                //         this.len += 1;
                //         this.move_x = -1;
                //     }
                //     if (this.len === this.STEP_LEN) {
                //         this.len = 0;
                //         this.move_x = 0;
                //         this.move = !this.move;
                //     }
                // } else {
                //     //вернуться на стартовую позицию
                //     //console.log("back home", this.start_x,  this.start_y)
                //
                //     if (this.pos_x > this.start_x) {
                //         this.move_x = -1;
                //         return;
                //     }
                //     if (this.pos_x < this.start_x) {
                //         this.move_x = 1;
                //         return;
                //     }
                //     if (this.pos_y > this.start_y) {
                //         this.move_y = -1;
                //         return;
                //     }
                //     if (this.pos_y < this.start_y) {
                //         this.move_y = 1;
                //         return;
                //     }
                //     if (this.pos_x === this.start_x) this.move_x = 0;
                //     if (this.pos_y === this.start_y) this.move_y = 0;
                //     if (this.pos_x === this.start_x && this.pos_y === this.start_y) {
                //         this.isInStart = true;
                //         // this.move_x = 0;
                //         // this.move_y = 0;
                //     }
                //
                //
                // }


            }
        }

        this.A_star = function (dest_x, dest_y) {
            this.isMapObject = true;
            //console.log(mapManager.getTilesetIdx(this.pos_x + Math.floor(this.move_x * this.speed) + this.size_x / 2,this.pos_y + Math.floor(this.move_y * this.speed) + this.size_y / 2))
            // if (mapManager.getTilesetIdx(this.pos_x + Math.floor(this.move_x * this.speed) + this.size_x / 2,
            //     this.pos_y + Math.floor(this.move_y * this.speed) + this.size_y / 2) ===22){
            //     this.isMapObject = false;
            // }

            if (this.move_x !== 0) {
                this.move_x = 0;
                if (this.pos_y >= dest_y) this.move_y = -1;
                if (this.pos_y < dest_y) this.move_y = 1;
                console.log("upppp")
                physicManager.update(this);
                return;
            }
            if (this.move_y !== 0) {

                this.move_y = 0;
                if (this.pos_x >= dest_x) this.move_x = -1;
                if (this.pos_x < dest_x) this.move_x = 1;
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