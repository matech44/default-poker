
/*
 * controller.js
 * 
 * GUI calls these functions on user interaction
 * 
 */

var engine; // engine.js
var animation; // animation.js
var history; // array of ended game objects

/**
 * called in <body onload="...
 * all startup code goes here
 * creates animation object
 */
function pageLoaded() {
	animation = new Animation();
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