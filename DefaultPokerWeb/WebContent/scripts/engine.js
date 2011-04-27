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
	this.dealer = 0;
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
	this.bet = 0;
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
	this.smallblind = 5;
	this.bigblind = 10;

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
		this.ticker = setInterval('engine.progress()', 2000);
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
		
		/* 
		 * SEAT MAPPING 
		 */
		
		var sequences = [0, 6, 5, 4, 3, 7, 2, 1, 8];
		var seatsequence = new Array();
		var tempseatsequence = new Array();
		var turnsequence = new Array();
		
		for(var i = 0; i < sequences.length; i++) {
			seatsequence.push(sequences[i]);
		}
		
		for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
			tempseatsequence.push(seatsequence[i]);
		}
		
		for(var i = 0; i < tempseatsequence.length; i++) {
			var min = 100;
			var minindex;
			for(var j = 0; j < tempseatsequence.length; j++) {
				if(tempseatsequence[j] < min) {
					min = tempseatsequence[j];
					minindex = j;
				}
			}
			turnsequence.push(minindex);
			tempseatsequence[minindex] = 100;
		}
		
		/* 
		 * SETUP 
		 */
		
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
			
			this.initialized = 1;
			showAnnouncement(1000, 100, "Preflop");
			
			this.currentgame.table.bet = this.currentgame.bigblind;
			this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.players.length-2]].dealer = 1;
			setDealer(turnsequence[this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.players.length-3]].seat]);
			this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.players.length-2]].bet = this.currentgame.smallblind;
			this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.players.length-1]].bet = this.currentgame.bigblind;
			this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.players.length-2]].chips -= this.currentgame.smallblind;
			this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.players.length-1]].chips -= this.currentgame.bigblind;
			
			/* DISPLAY PLAYER CHIP AMOUNT */
			for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
				setPlayerMoney(seatsequence[i], this.currentgame.currentround.players[i].chips);
			}
			
			/* skip real play */
			return;
		}
		
		/* DISPLAY PLAYER BET AMOUNT */
		for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
			if(!this.currentgame.currentround.players[turnsequence[i]].bet) continue;
			changePlayerBet(
					this.currentgame.currentround.players[turnsequence[i]].seat, 
					this.currentgame.currentround.players[turnsequence[i]].bet
					);
		}
		
		/* 
		 * ALL PLAYERS HAVE MADE TURN 
		 */
		
		if(this.currentgame.currentround.turn >= this.currentgame.currentround.players.length) {
			this.currentgame.startNewRound();
			
			/* flop, deal table cards, show first three */
			if(this.currentgame.status == 2) {
				showAnnouncement(1000, 100, "Flop");
				
				
				/* send all chips to pot */
				this.currentgame.table.pot = 0;
				
				for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
					chipsToPot(this.currentgame.currentround.players[turnsequence[i]].seat);
					this.currentgame.table.pot += this.currentgame.currentround.players[turnsequence[i]].bet;
					this.currentgame.currentround.players[turnsequence[i]].bet = 0;
					changePlayerBet(
							this.currentgame.currentround.players[turnsequence[i]].seat, 
							""
							);
				}
				
				ourChipToPot();
				
				changeOurBet("");
				
				this.currentgame.table.bet = 0;
				setPot(this.currentgame.table.pot);
				
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
				
				/* send all chips to pot */		
				for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
					chipsToPot(this.currentgame.currentround.players[turnsequence[i]].seat);
					this.currentgame.table.pot += this.currentgame.currentround.players[turnsequence[i]].bet;
					this.currentgame.currentround.players[turnsequence[i]].bet = 0;
					changePlayerBet(
							this.currentgame.currentround.players[turnsequence[i]].seat, 
							""
							);
				}
				
				ourChipToPot();
				
				changeOurBet("");
				
				this.currentgame.table.bet = 0;
				setPot(this.currentgame.table.pot);
				
				flipTurn(this.currentgame.table.cards[3].getMapping());
			}
			
			/* river, show last card */
			if(this.currentgame.status == 4) {
				showAnnouncement(1000, 100, "River");
				
				/* send all chips to pot */		
				for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
					chipsToPot(this.currentgame.currentround.players[turnsequence[i]].seat);
					this.currentgame.table.pot += this.currentgame.currentround.players[turnsequence[i]].bet;
					this.currentgame.currentround.players[turnsequence[i]].bet = 0;
					changePlayerBet(
							this.currentgame.currentround.players[turnsequence[i]].seat, 
							""
							);
				}
				
				ourChipToPot();
				
				changeOurBet("");
				
				this.currentgame.table.bet = 0;
				setPot(this.currentgame.table.pot);
				
				flipRiver(this.currentgame.table.cards[4].getMapping());
			}
			
			/* show hands */
			if(this.currentgame.status == 5) {
				showAnnouncement(1000, 100, "Show hands");
				
				/* send all chips to pot */		
				for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
					chipsToPot(this.currentgame.currentround.players[turnsequence[i]].seat);
					this.currentgame.table.pot += this.currentgame.currentround.players[turnsequence[i]].bet;
					this.currentgame.currentround.players[turnsequence[i]].bet = 0;
					changePlayerBet(
							this.currentgame.currentround.players[turnsequence[i]].seat, 
							""
							);
				}
				
				ourChipToPot();
				
				changeOurBet("");
				
				this.currentgame.table.bet = 0;
				setPot(this.currentgame.table.pot);
				
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
				this.currentgame.currentround.turn = this.currentgame.currentround.players.length;
				this.pauseTicker(4000);
			}
			
			/* collect cards */
			if(this.currentgame.status == 6) {
				
				/* chips to winning player */
				/*for(var i = 0; i < this.currentgame.currentround.players.length; i++) {
					if(this.currentgame.currentround.players[i].name == this.currentgame.getWinningPlayer().player.name) {
						this.currentgame.currentround.players[i].chips += this.currentgame.table.pot;
						setPlayerMoney(this.currentgame.currentround.players[turnsequence[i]].seat, this.currentgame.currentround.players[i].chips);
					}
				}*/
				
				this.currentgame.table.pot = 0;
				setPot(this.currentgame.table.pot);
				
				//showPlayers();
				showAnnouncement(4000, 40, this.currentgame.getWinningPlayer().player.name + 
						" takes pot with " + this.currentgame.getWinningPlayer().hand.value);
				addTextToHistory(this.currentgame.getWinningPlayer().player.name + 
						" takes pot with " + this.currentgame.getWinningPlayer().hand.value);
				playerCardsBackside();
				unDealCards(this.currentgame.currentround.players.length-1);
				unDealOurCards(0);
				
				this.endTicker();
			}
			
			/* skip real play */
			return;
		}
		
		/* 
		 * PLAYERS CHOOSE 
		 */
		
		/* IF PLAYER HAS FOLDED, SKIP */
		if(this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].fold) {
			while(this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].fold) {
				this.currentgame.currentround.turn++;
			}
		}
		
		/* BOT CHOOSES */
		if(this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].is_bot) {
			
			var randomvalue = Math.floor(Math.random()*6);
			
			if(!randomvalue) {
				this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].fold = 1;
				fadePlayer(this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].seat);
				changeDisplay(
						this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].seat,
						"Fold"
						);
			} else {
				if(this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].bet < this.currentgame.table.bet) {
					this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].chips -= (this.currentgame.table.bet - 
							this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].bet);
					this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].bet = this.currentgame.table.bet;
					setPlayerMoney(
							this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].seat, 
							this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].chips
							);
					chipsToBet(this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].seat);
					changePlayerBet(
							this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].seat, 
							this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].bet
							);
					changeDisplay(
							this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].seat,
							"Call"
							);
				} else {
					changeDisplay(
							this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].seat,
							"Check"
							);
				}
			}
		}
		
		/* PLAYER CHOOSES */

		if(!this.currentgame.currentround.players[turnsequence[this.currentgame.currentround.turn]].is_bot) {
			hidePlayerButtons(false);
			this.endTicker();
			return;
		}
		
		/* INCREMENT TURN */
		this.currentgame.currentround.turn++;
	};
}

