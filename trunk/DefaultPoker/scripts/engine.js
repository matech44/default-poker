/*
 * engine.js
 */

/*
 *  DATA STRUCTURES
 */

/**
 * Player structure called only by engine
 * 
 * @param name
 *            String
 * @param is_bot
 *            Boolean
 * @returns {Player}
 */
function Player(name, is_bot) {
	this.name = name;
	this.is_bot = is_bot;
	this.chips = 100;
	this.bet = 0;
	this.cards = new Array();
	
	/*
	 * METHODS
	 */
	
	this.setCards = function(cards) {
		this.cards = cards;
	};

	this.getCards = function() {
		return this.cards;
	};
	
	this.addChips = function(amount) {
		this.chips += amount;
	};

	this.reduceChips = function(amount) {
		this.chips -= amount;
	};
	this.getChips = function() {
		return this.chips;
	};
	this.getBet = function() {
		return this.bet;
	};

	this.setBet = function(amount) {
		this.bet = amount;
	};
}

/**
 * Poker table structure called only by engine
 * 
 * @returns {Table}
 */
function Table() {
	this.pot = 0;
	this.cards = new Array();
	
	/*
	 * METHODS
	 */
	
	this.addPot = function(amount) {
		this.pot += amount;
	};
	
	this.reducePot = function(amount) {
		this.pot -= amount;
	};
	
	this.getPot = function() {
		return this.pot;
	};
	
	this.getCards = function() {
		return this.cards;
	};

	this.setCards = function(cards) {
		this.cards = cards;
	};
}

/**
 * one Round lasts until all Players have made one choice
 * 
 * @returns {Round}
 */
function Round(table) {
	this.table = table;
	this.players = new Array();
	this.smallblind = 3;
	this.bigblind = 6;

	/*
	 * METHODS
	 */

	/**
	 * Player calls YOUR MOM
	 */
	this.playerCall = function(id) {
		var bet = 0;
		var biggestbet = 0;
		for (player in this.payers) {
			if (player.getBet > bet) {
				biggestbet = player.getBet;
			}
		}
		this.players[id].reduceChips(biggestbet-this.players[id].getBet());
		this.players[id].setBet(biggestbet);
	};
	
	/**
	 * Player all in
	 */
	this.playerAllIn = function(id) {
		this.players[id].setBet(this.players[id].getBet()+this.players[id].getChips());
		this.players[id].reduceChips(this.players[id].getChips());
	};


	/**
	 * Player raises
	 */
	this.playerRaise = function(id, bet) {
		this.players[id].setBet(this.players[id].getBet() + bet);
		this.players[id].reduceChips(bet);
	};
	
	/**
	 * Player checks
	 */
	this.playerCheck= function(id) {
		// TODO
	};

	/**
	 * folds a Player
	 */
	this.foldPlayer = function(id) {
		this.players.splice(id, 1);
	};
	
	/**
	 * all players
	 */
	this.getPlayers = function() {
		return this.players;
	};
	
	/**
	 * player
	 */
	this.getPlayer = function(id) {
		return this.players[id];
	};
	
	/**
	 * 
	 */
	this.setPlayerCards = function(id, cards) {
		this.players[id].setCards(cards);
	};
}

/**
 * one Game lasts one hand
 * 
 * @returns {Game}
 */
function Game() {
	this.table = new Table();
	this.rounds = new Array();
	this.currentround;
	this.cardsystem = new CardSystem();
	this.gamecards = this.cardsystem.getAllCards();

	/*
	 * METHODS
	 */

	/**
	 * 
	 */
	this.startNewRound = function() {
		if(this.currentround) {
			this.rounds.push(this.currentround);
		}
		
		this.currentround = new Round();
	};

	/**
	 * deals cards to Table object
	 */
	this.dealTableCards = function() {
		var cards = new Array();
		
		for(var i = 0; i < 5; i++) {
			cards.push(this.randomCard());
		}
		
		this.table.setCards(cards);
		
		return cards;
	};

	/**
	 * deals cards to Player objects
	 */
	this.dealPlayerCards = function()  {
		var cards;
		
		for(var i = 0; i < this.currentround.getPlayers().length; i++) {
			cards = new Array()
			for(var j = 0; j < 2; j++) {
				cards.push(this.randomCard());
			}
			this.currentround.setPlayerCards(i, cards);
		}
		
		return cards;
	};
	

	/**
	 * @returns random number
	 */
	this.randomCard = function() {
		var amount = this.gamecards.length;
		var randomvalue = Math.floor(Math.random()*(amount-1));
		
		return this.gamecards.splice(randomvalue, 1)[0];
	};

	
	/**
	 * @returns Player with winning hand
	 */
	this.getWinningPlayer = function() {
		var playerhand;
		var strongest = 0;
		var besthand;
		var bestplayer;
		
		for(var i = 0; i < this.currentround.getPlayers().length; i++) {
			playerhand = this.currentround.getPlayers()[i].getCards().concat(this.table.getCards());
			

			this.cardsystem.setCards(playerhand);
			
			if(this.cardsystem.getValue().strength > strongest) {
				strongest = this.cardsystem.getValue().strength;
				besthand = this.cardsystem.getValue();
				bestplayer = this.currentround.getPlayers()[i];
			}
		}
		
		return {player : bestplayer, hand : besthand};
	};

	/**
	 * @returns Integer pot size on poker table
	 */
	this.getCurrentRound = function() {
		return this.currentround;
	};

	/**
	 * @returns Table
	 */
	this.getTable = function() {
		return this.table;
	};
	
}

/**
 * Whole Poker game structure
 * 
 * @returns {PokerStructure}
 */
function Engine() {
	this.currentgame;
	this.games = new Array();
	
	/*
	 * METHODS
	 */

	/**
	 * starts new game
	 */
	this.startNewGame = function() {
		if(this.currentgame) {
			games.push(this.currentgame);
		}

		this.currentgame = new Game();
	};	

	/**
	 * @returns current Game object
	 */
	this.getCurrentGame = function() {
		return this.currentgame;
	};

	/**
	 * creates new Player object
	 */
	this.createPlayer = function(name) {
		var player = new Player(name, false);
		var playerid = this.currentgame.getCurrentRound().players.length;
		this.currentgame.getCurrentRound().players.push(player);
		return playerid;
	};

	/**
	 * creates new Player object
	 */
	this.createBot = function(name) {
		var bot = new Player(name, true);
		this.currentgame.getCurrentRound().players.push(bot);
	};
}


