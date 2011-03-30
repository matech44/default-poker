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
	this.fold = 0;
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
	this.fold = 0;
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
			if(this.currentround.players[i].fold) continue;
			
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
	 * @returns Player with winning hand
	 */
	this.getPlayerHand = function(id) {
		var playerhand;
		var hand;
		
		if(this.currentround.players[id].fold) return {value : "Fold", strength : 0};
		
		playerhand = this.currentround.getPlayers()[id].getCards().concat(this.table.getCards());
		this.cardsystem.setCards(playerhand);
		hand = this.cardsystem.getValue();
		
		return hand;
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
		this.ticker = setInterval('engine.progress()', 800);
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
		
		var seatsequence = [0, 6, 5, 4, 3, 7, 2, 1, 8];
		var turnsequence = [0, 1, 2, 3, 4, 5, 6, 7, 8]
		
		var foldedplayers;
		
		for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
			if(this.currentgame.currentround.players[i].fold) foldedplayers++;
		}
		
		/* first tick, set up */
		if(!this.initialized) {
			addTextToHistory("Starting new game...");
			for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
				this.currentgame.currentround.players[i].seat = seatsequence[i];
				this.currentgame.currentround.players[i].fold = 0;
				if(i)
					changePlayerName(seatsequence[i], this.currentgame.currentround.players[i].name);
			}
			for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
				if(!this.currentgame.currentround.players[i].is_bot) {
					flipOurCardsFront(
							this.currentgame.currentround.players[i].cards[0].getMapping(),
							this.currentgame.currentround.players[i].cards[1].getMapping()
							);
				}
			}
			hidePlayers(9-this.currentgame.currentround.players.length);
			hidePlayerButtons(true);
			dealCards(this.currentgame.currentround.players.length-1);
			resetMoney();
			this.initialized = 1;
			showAnnouncement(1000, 100, "Preflop");
			
			/* skip real play */
			return;
		}
		
		/* new round */
		if(this.currentgame.currentround.turn == this.currentgame.currentround.players.length) {
			this.currentgame.startNewRound();
			
			/* flop, deal table cards, show first three */
			if(this.currentgame.status == 2) {
				showAnnouncement(1000, 100, "Flop");
				dealTableCards(0);
				flipFlop(
						this.currentgame.table.cards[0].getMapping(), 
						this.currentgame.table.cards[1].getMapping(), 
						this.currentgame.table.cards[2].getMapping()
						);
			}
			
			/* turn, show card */
			if(this.currentgame.status == 3) {
				showAnnouncement(1000, 100, "Turn");
				flipTurn(this.currentgame.table.cards[3].getMapping());
			}
			
			/* river, show last card */
			if(this.currentgame.status == 4) {
				showAnnouncement(1000, 100, "River");
				flipRiver(this.currentgame.table.cards[4].getMapping());
			}
			
			/* show hands */
			if(this.currentgame.status == 5) {
				showAnnouncement(1000, 100, "Show hands");
				for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
					if(this.currentgame.currentround.players[i].seat) {
						flipCards(
								this.currentgame.currentround.players[i].seat, 
								this.currentgame.currentround.players[i].cards[0].getMapping(),
								this.currentgame.currentround.players[i].cards[1].getMapping()
								);
					}
				}
				for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
					if(this.currentgame.getPlayerHand(i).strength)
						addTextToHistory(this.currentgame.currentround.players[i].name + " has " +
								this.currentgame.getPlayerHand(i).value);
				}
				this.pauseTicker(4000);
			}
			
			/* collect cards */
			if(this.currentgame.status == 6) {
				showPlayers();
				showAnnouncement(4000, 40, this.currentgame.getWinningPlayer().player.name + 
						" takes pot with " + this.currentgame.getWinningPlayer().hand.value);
				addTextToHistory(this.currentgame.getWinningPlayer().player.name + 
						" takes pot with " + this.currentgame.getWinningPlayer().hand.value);
				playerCardsBackside();
				unDealCards(this.currentgame.currentround.players.length-1);
				unDealOurCards(0);
				this.endTicker();
			}
			
			/* show new status */
			
			/* skip real play */
			return;
		}
		
		/* real playing from here */
		
		/* bot */
		if(this.currentgame.currentround.players[this.currentgame.currentround.turn].is_bot) {
			
			if(this.currentgame.currentround.players[this.currentgame.currentround.turn].fold) {
				this.currentgame.currentround.turn++;
				return;
			}
			
			var displayhash = {
				0 : 'Fold',
				1 : 'Check',
				2 : 'Check',
				3 : 'Check'
			};
			
			var randomvalue = Math.floor(Math.random()*4);
			
			changeDisplay(
					this.currentgame.currentround.players[this.currentgame.currentround.turn].seat,
					displayhash[randomvalue]
					);
			
			if(!randomvalue) {
				this.currentgame.currentround.players[this.currentgame.currentround.turn].fold = 1;
				fadePlayer(this.currentgame.currentround.players[this.currentgame.currentround.turn].seat);
			}

		/* player */
		} else {
			hidePlayerButtons(false);
			this.endTicker();
		}
		
		this.currentgame.currentround.turn++;
	};
}

