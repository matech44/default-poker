
/*
 * engine.js
 *
 * Only function Engine() should be visible to GUI
 *
 * GUI creates instance of Engine for one game and uses all of 
 * its methods to change game state
 */


/**
 * Player structure
 * called only by engine
 * @param name String
 * @param is_bot Boolean
 * @returns {Player}
 */
function Player(name, is_bot) {
	this.name = name;
	this.is_bot = is_bot;
	this.chips = 0;
	this.cards = new Array(2);
	
	/*
	 * METHODS
	 */
	
	this.setCards = function(cards) {
		this.cards = cards;
	}
	
	this.getCards = function() {
		return this.cards;
	}
	
	this.addChips = function(amount) {
		this.chips += amount;
	}

	this.reduceChips = function(amount) {
		this.chips -= amount;
	}
}

/**
 * Poker table structure
 * called only by engine
 * @returns {Table}
 */
function Table() {
	this.pot = 0;
	this.cards = new Array(5);
	
	/*
	 * METHODS
	 */
	
	this.addChips = function(amount) {
		this.pot += amount;
	}
	
	this.reduceChips = function(amount) {
		this.pot -= amount;
	}
	
	this.getPot = function() {
		return this.pot;
	}
	
	this.getCards = function() {
		return this.cards;
	}
}

/**
 * Game logic
 * GUI calls its methods
 * @returns {Engine}
 */
function Engine() {
	this.table = new Table();
	this.players = new Array(9);
	
	/*
	 * METHODS FOR GUI
	 */
	
	/**
	 * sets game started? 
	 */
	this.startGame = function() {
		// TODO implementation?
	}
	
	/**
	 * @returns Integer pot size on poker table
	 */
	this.getPot = function() {
		return this.table.getPot();
	}
	
	this.createPlayer = function(name, is_bot) {
		this.player.push(new Player(name, is_bot));
	}
}
