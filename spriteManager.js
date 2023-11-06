import {mapManager} from "./globals.js";

export class SpriteManager {
    constructor() {
        this.image = new Image();
        this.sprites = new Array();
        this.imgLoaded = false;
        this.jsonLoaded = false;

    }

    loadAtlas(atlasJson, atlasImg) {
        var request = new XMLHttpRequest();
        let mySelf = this
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                mySelf.parseAtlas(request.responseText);
            }
        };

        request.open("GET", atlasJson, true);
        request.send();
        this.loadImg(atlasImg);
    }

    loadImg(imgName) {
        let mySelf = this
        this.image.onload = function () {

            mySelf.imgLoaded = true;
        }

        this.image.src = imgName
    }

    parseAtlas(atlasJSON) {
        var atlas = JSON.parse(atlasJSON)
        for (var name in atlas.frames) {
            var frame = atlas.frames[name].frame;
            this.sprites.push({name: name, x: frame.x, y: frame.y, w: frame.w, h: frame.h});
        }

        this.jsonLoaded = true;
    }

    drawSprite(ctx, name, x, y) {
        let mySelf = this
        if (!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(function () {
                mySelf.drawSprite(ctx, name, x, y)
            }, 100)
        } else {
            var sprite = this.getSprite(name);

            if (!mapManager.isVisible(x, y, sprite.w, sprite.h))
                return
            x -= mapManager.view.x;
            y -= mapManager.view.y;
            //console.log( sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h)
            ctx.drawImage(this.image,sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);

        }
    }

    getSprite(name) {
        for (var i = 0; i < this.sprites.length; i++) {
            var s = this.sprites[i];
            if (s.name === name)
                return s
        }
        return null;
    }
}

