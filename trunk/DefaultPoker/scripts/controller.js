
/*
 * controller.js
 * 
 * GUI calls these functions on user interaction
 * 
 */

var engine; // engine.js
var animations; // animations.js
var history; // array of ended engine objects

/**
 * called in <body onload="...
 * all startup code goes here
 * creates animation object
 */
function pageLoaded() {
	// animations = new Animations();
}

/**
 * called when new game button clicked
 * engine restarted
 * old engine pushed to stack
 */
function startNewGameClicked() {
	engine = new Engine();
	
	hideMainDiv(false);
	
	engine.startNewGame();
	engine.currentgame.startNewRound();
	
	engine.createPlayer("Andres");
	engine.createBot("Ardi");
	engine.createBot("Sepp");
	engine.createBot("Jumal");
	engine.createBot("Jeesus");
	engine.createBot("Pirokunn");


	
	engine.currentgame.dealTableCards();
	engine.currentgame.dealPlayerCards();
	
	engine.startTicker();
	
}

// TODO create new functions...