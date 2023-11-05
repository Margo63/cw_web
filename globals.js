import {MapManager} from "./mapManager.js";
import {SpriteManager} from "./spriteManager.js";
import {EventManager} from "./eventManager.js";
import {GameManager} from "./gameManager.js";
import {PhysicManager} from "./physicManager.js";
import {SoundManager} from "./soundManager.js";


export let mapManager = new MapManager();
export let spriteManager = new SpriteManager();
export let gameManager = new GameManager();
export let eventsManager = new EventManager();
export let physicManager = new PhysicManager();
export let soundManager = new SoundManager();

export var canvas = document.getElementById("canvasId");
export var ctx = canvas.getContext("2d");