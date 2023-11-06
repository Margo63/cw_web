import {eventsManager} from "../globals.js";

export class EventManager{
    constructor() {
        this.bind= []
        this.action = []
        this.setup = function(canvas){

            this.bind[87]='up';
            this.bind[65]='left';
            this.bind[83]='down';
            this.bind[68]='right';
            this.bind[32]='fire';

            //console.log(this.bind)

            canvas.addEventListener('mousedown', this.onMouseDown);
            canvas.addEventListener('mouseup', this.onMouseUp);

            document.body.addEventListener("keydown", this.onKeyDown);
            document.body.addEventListener("keyup", this.onKeyUp);
        }

        this.onMouseDown= function (event){
            //console.log("onMouseDown")
            eventsManager.action['fire'] = true;
        }
        this.onMouseUp = function(event){
            //console.log("onMouseUp")
            eventsManager.action["fire"] = false;
        }

        this.onKeyDown = function(event){
            //console.log("onKeyDown"+event.keyCode)
            //console.log(event.keyCode)

            var action = eventsManager.bind[event.keyCode];
            if(action)
                eventsManager.action[action] = true;
        }

        this.onKeyUp = function(event){
            //console.log("onKeyUp")
            var action = eventsManager.bind[event.keyCode];
            if(action)
                eventsManager.action[action] = false;
        }


    }

}