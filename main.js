import {MapManager} from "./mapManager.js"
import {Player} from "./player.js";
import {SpriteManager} from "./spriteManager.js";

var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");
// var image = new Image();
// image.src = "NinjaAdventure/Backgrounds/Tilesets/TilesetField.png"
// ctx.drawImage(image, 10,10,1000,1000)
let mapManager = new MapManager()
let spriteManager = new SpriteManager(mapManager);


mapManager.loadMap("tilemap.json");
spriteManager.loadAtlas("atlas.json","img/hero_up.png");
mapManager.draw(ctx);


