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

            canvas.addEventListener('mousedown', this.onMouseDown);
            canvas.addEventListener('mouseup', this.onMouseUp);

            document.body.addEventListener("keydown", this.onKeyDown);
            document.body.addEventListener("keyup", this.onKeyUp);
        }

        this.onMouseDown= function (event){
            this.action['fire'] = true;
        }
        this.onMouseUp = function(event){
            this.action["fire"] = false;
        }

        this.onKeyDown = function(event){
            var action = this.bind[event.keyCode];
            if(action)
                this.action[action] = true;
        }

        this.onKeyUp = function(event){
            var action = this.bind[event.keyCode];
            if(action)
                this.action[action] = false;
        }


    }

}