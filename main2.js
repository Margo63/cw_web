import {ctx, gameManager} from "./globals.js";

localStorage['next'] = "record.html"
gameManager.loadAll("../data/tilemap2.json");
gameManager.draw(ctx);
gameManager.play();