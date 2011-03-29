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
	this.turn = 0;
	this.seat;
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
function Round() {
	this.players = new Array();
	this.turn = 0;
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
	this.status = 0; // 0 - preflop; 1 - flop; 2 - turn; 3 - river;
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
		var players = new Array();
		
		if(this.currentround) {
			players = this.currentround.players;
			this.rounds.push(this.currentround);
		}
		
		this.currentround = new Round();
		this.currentround.players = players;
		this.status++;
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
	this.initialized = 0;
	this.ticker;
	
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
		var player = new Player(name, 0);
		var playerid = this.currentgame.currentround.players.length;
		this.currentgame.getCurrentRound().players.push(player);
		return playerid;
	};

	/**
	 * creates new Player object
	 */
	this.createBot = function(name) {
		var bot = new Player(name, 1);
		this.currentgame.getCurrentRound().players.push(bot);
	};
	
	/**
	 * starts progressing
	 */
	this.startTicker = function() {
		this.ticker = setInterval('engine.progress()', 1000);
	};
	
	/**
	 * ends progressing
	 */
	this.endTicker = function() {
		clearInterval(this.ticker);
	};
	
	/**
	 * ends progressing
	 */
	this.pauseTicker = function(time) {
		clearInterval(this.ticker);
		setTimeout('engine.startTicker()', time);
	};
	
	/**
	 * one progress
	 */
	this.progress = function() {
		var statushash = {
				1 : 'Preflop', 
				2 : 'Flop',
				3 : 'Turn',
				4 : 'River',
				5 : 'Show hands',
				6 : this.currentgame.getWinningPlayer().player.name + ' takes pot'
			};
		
		var seatsequence = [0, 6, 5, 4, 3, 7, 2, 1, 8];
		
		/* first tick, set up */
		if(!this.initialized) {
			for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
				this.currentgame.currentround.players[i].seat = seatsequence[i];
			}
			hidePlayers(9-this.currentgame.currentround.players.length);
			dealCards(this.currentgame.currentround.players.length-1);
			this.initialized = 1;
			showAnnouncement(statushash[this.currentgame.status]);
			
			/* skip real play */
			return;
		}
		
		/* new round */
		if(this.currentgame.currentround.turn == this.currentgame.currentround.players.length) {
			this.currentgame.startNewRound();
			
			/* flop, deal table cards, show first three */
			if(this.currentgame.status == 2) {
				dealTableCards(0);
				flipFlop(
						this.currentgame.table.cards[0].getMapping(), 
						this.currentgame.table.cards[1].getMapping(), 
						this.currentgame.table.cards[2].getMapping()
						);
			}
			
			/* turn, show card */
			if(this.currentgame.status == 3) {
				flipTurn(this.currentgame.table.cards[3].getMapping());
			}
			
			/* river, show last card */
			if(this.currentgame.status == 4) {
				flipRiver(this.currentgame.table.cards[4].getMapping());
			}
			
			/* river, show last card */
			if(this.currentgame.status == 5) {
				for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
					if(this.currentgame.currentround.players[i].seat) {
						flipCards(
								this.currentgame.currentround.players[i].seat, 
								this.currentgame.currentround.players[i].cards[0].getMapping(),
								this.currentgame.currentround.players[i].cards[1].getMapping()
								);
					} else {
						flipOurCardsFront(
								this.currentgame.currentround.players[i].cards[0].getMapping(),
								this.currentgame.currentround.players[i].cards[1].getMapping()
								);
					}
				}
				this.pauseTicker(4000);
			}
			
			/* river, show last card */
			if(this.currentgame.status == 6) {
				unDealCards(this.currentgame.currentround.players.length-1);
				unDealOurCards(0);
				this.endTicker();
			}
			
			/* show new status */
			showAnnouncement(statushash[this.currentgame.status]);
			
			/* skip real play */
			return;
		}
		
		/* real playing from here */
		
		/* bot */
		if(this.currentgame.currentround.players[this.currentgame.currentround.turn].is_bot) {
			
		/* player */
		} else {
			
		}
		
		this.currentgame.currentround.turn++;
	};
}

