

import {ctx, gameManager, mapManager, spriteManager} from "./globals.js";
import {Player} from "./player.js";

// export var canvas = document.getElementById("canvasId");
// export var ctx = canvas.getContext("2d");
//
//  var image = new Image();
// image.src = "NinjaAdventure/Backgrounds/Tilesets/TilesetField.png"
// console.log(image)
// image.onload = function (){
//     ctx.drawImage(image, 10,100,1000,100)
// }

//let mapManager = new MapManager()



// mapManager.loadMap("tilemap.json");
// spriteManager.loadAtlas("atlas.json","img/hero_up.png");
// mapManager.parseEntities();
// mapManager.draw(ctx);

gameManager.loadAll();
gameManager.draw(ctx);
gameManager.play();


// let player = new Player();
// player.draw(ctx);

