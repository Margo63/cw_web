export class gameManager{
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
        if(eventsManager.action["right"]) this.player.move_x = 1


    }
    draw(ctx){
        for(let e = 0; e<this.entities.length; e++)
            this.entities[e].draw(ctx)
    }
    loadAll(){

    }
    play(){

    }
}