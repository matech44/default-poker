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
	this.playerRaise= function(id, bet) {
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
	 * all players
	 */
	this.getPlayer = function(id) {
		return this.players[id];
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
	this.cards;

	/*
	 * METHODS
	 */

	/**
	 * 
	 */
	this.startNewRound = function() {
		if(this.currentround) {
			this.rounds.push(this.currentround);
		};

		this.currentround = new Round();
	};
	
	/**
	 * returns all possible cards(for random card)
	 */
	this.getAllPossibleCards = function() {
		var cardvalue = ['A', 2, 3, 4, 5, 6, 7, 8, 9,'T','J','Q','K'];
		var cardsuit = ['diamonds', 'spades', 'hearts', 'clubs'];
		var cards = new Array();
		for(value in cardvalue) {
			for(suit in cardsuit) {
				cards.push(gaga.createCard(value, suit));
			}
		}
		
		return cards;	
	};
	
	this.gamecards = this.getAllPossibleCards();

	/**
	 * deals cards to Table object
	 */
	this.dealTableCards = function() {
		this.table.setCards( [this.randomCard(), this.randomCard(), this.randomCard(),
		                      this.randomCard(), this.randomCard()] );
	};

	/**
	 * deals cards to Player objects
	 */
	this.dealPlayerCards = function()  {
		var cardarray = [this.randomCard(), this.randomCard()];
		
		for(var i = 0; i < this.currentround.getPlayers().length; i++) {
			this.currentround.getPlayers()[i].setCards(cardarray);
		}
	};
	
	this.randInt = function(a, b) {
		return (Math.floor(Math.random()*(b-a+1)))+a;
	}

	/**
	 * @returns random number
	 */
	this.randomCard = function() {
		var randomvalue = this.randInt(0, this.gamecards.lenght-1);
		return this.gamecards.splice(randomvalue, 1);
	};

	/**
	 * @returns Players best hand
	 */
	this.getBestHand = function(player) {
		this.cards = new Array();
		var combinations = [[1,2,3], [1,2,4],[1,2,5],[1,3,4],[1,3,5],[1,4,5],[2,3,4],[2,3,5],[2,4,5],[3,4,5]];
		
		for(var playercard in player.getCards()) {
			this.cards.push(playercard);
		}
		
		for(var tablecard in this.table.getCards()) {
			this.cards.push(tablecard);
		}
		
		var besthand = gaga.createHand([
										[2, 'spades'],
										[3, 'clubs'],
										[4, 'diamonds'],
										[5, 'clubs'],
										[7, 'diamonds']
										]);
		for (combination in combinations) {
			var hand = gaga.createHand([
										[2, 'spades'],
										[3, 'clubs'],
										[4, 'diamonds'],
										[5, 'clubs'],
										[7, 'diamonds']
										]);
		
			if(besthand.identify().rank < hand.identify().rank) {
				besthand = hand;
			}
		}
		
		return besthand;
	};
	
	/**
	 * @returns Player with winning hand
	 */
	this.getWinningPlayer = function() {
		var players = this.currentround.getPlayers();
		var bestplayer = new Player('Error', true);
		var besthand = gaga.createHand([
		                                [2,'hearts'],
		                                [3,'clubs'],
		                                [5,'spades'],
		                                [6,'hearts'],
		                                [8,'clubs']
		                                ]);
										
		for(var i = 0; i < this.currentround.getPlayers().length; i++) {
			var player = this.currentround.getPlayers()[i];
			var besthand2 = this.getBestHand(player);
			if(besthand.identify().rank < besthand2.identify().rank) {
				besthand = hand;
				bestplayer = player;
			}				
		}
		
		return bestplayer;
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
function PokerStructure() {
	this.currentgame;
	this.games = new Array();
	
	/*
	 * METHODS
	 */
	
	/**
	 * sets game started?
	 */
	this.initializeStructure = function() {
		this.startNewGame();
	};

	/**
	 * starts new game
	 */
	this.startNewGame = function() {
		if(this.currentgame) {
			games.push(this.currentgame);
		};

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


