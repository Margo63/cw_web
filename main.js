

import {ctx, gameManager, mapManager, spriteManager} from "./globals.js";
import {Player} from "./player.js";


// var image = new Image();
// image.src = "NinjaAdventure/Backgrounds/Tilesets/TilesetField.png"
// ctx.drawImage(image, 10,10,1000,1000)
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

