
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
	var player2id = engine.createPlayer("Ardi");
	var player3id = engine.createPlayer("Sepp");
	
	engine.currentgame.dealTableCards();
	engine.currentgame.dealPlayerCards();
	
	document.getElementById("stats").innerHTML = "Table cards: \n";
	
	for(var i = 0; i < engine.currentgame.table.cards.length; i++) {
		document.getElementById("stats").innerHTML += engine.currentgame.table.cards[i].getName() + "\n";
	}
	
	document.getElementById("stats").innerHTML += "\n";
	
	for(var i = 0; i < engine.currentgame.currentround.players.length; i++) {
		document.getElementById("stats").innerHTML += engine.currentgame.currentround.players[i].name +
			"'s cards\n";
		
		for(var j = 0; j < engine.currentgame.currentround.players[i].cards.length; j++) {
			document.getElementById("stats").innerHTML += engine.currentgame.currentround.players[i].cards[j].getName() + "\n";
		}
		
		document.getElementById("stats").innerHTML += "\n";
	}
	
	document.getElementById("stats").innerHTML += engine.currentgame.getWinningPlayer().player.name;
	document.getElementById("stats").innerHTML += " " + engine.currentgame.getWinningPlayer().hand.value;
}

// TODO create new functions...