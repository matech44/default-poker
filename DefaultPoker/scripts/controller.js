
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
	
	engine.startNewGame();
	engine.currentgame.startNewRound();
	
	var player1id = engine.createPlayer("Andres");
	var player2id = engine.createBot("Ardi");
	var player3id = engine.createBot("Sepp");
	var player4id = engine.createBot("Jumal");
	var player5id = engine.createBot("Jeesus");
	var player6id = engine.createBot("Pirokunn");

	
	engine.currentgame.dealTableCards();
	engine.currentgame.dealPlayerCards();
	
	engine.startTicker();
	
}

// TODO create new functions...