
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
	animations = new Animations();
}

/**
 * called when new game button clicked
 * engine restarted
 * old engine pushed to stack
 */
function startNewGameClicked() {
	history.push(engine);
	engine = new Engine();
}

// TODO create new functions...