/**
 * hand_eval.js
 * @description 7 card hand evaluation
 */
 
function sortNumber(a, b) {
	return a - b;
}

/**
 * single card structure
 */
function Card(value, suit) {
	this.value = value;
	this.suit = suit;
	
	this.getName = function() {
		var valuehash = {
				2 : '2',
				3 : '3',
				4 : '4',
				5 : '5',
				6 : '6',
				7 : '7',
				8 : '8',
				9 : '9',
				10 : 'T',
				11 : 'J',
				12 : 'Q',
				13 : 'K',
				14 : 'A'
			}
	
		var suithash = {
				1 : 'Diamonds', 
				2 : 'Spades',
				3 : 'Hearts',
				4 : 'Clubs'
			}
		
		return valuehash[this.value] + " " + suithash[this.suit];
	}
	
	this.getMapping = function() {
		var valuehash = {
				2 : 'Two',
				3 : 'Three',
				4 : 'Four',
				5 : 'Five',
				6 : 'Six',
				7 : 'Seven',
				8 : 'Eight',
				9 : 'Nine',
				10 : 'Ten',
				11 : 'Jack',
				12 : 'Queen',
				13 : 'King',
				14 : 'Ace'
			}
	
		var suithash = {
				1 : 'diamonds', 
				2 : 'spades',
				3 : 'hearts',
				4 : 'clubs'
			}
		
		return suithash[this.suit]+valuehash[this.value];
	}
}

/**
 * hand evaluation algorithms
 */
function Evaluation() {
	this.cards;
	
	this.setCards = function(cards) {
		this.cards = cards;
	};
	
	/* Sepa kombinatsioonide algoritm */
	this.getAllCombinations = function() {
		var indices = 	[
						[0, 1, 2, 3, 4], 
						[0, 1, 2, 3, 5], 
						[0, 1, 2, 3, 6], 
						[0, 1, 2, 4, 5],
						[0, 1, 2, 4, 6],
						[0, 1, 3, 4, 5],
						[0, 1, 3, 5, 6],
						[0, 1, 4, 5, 6],
						[0, 2, 3, 4, 5],
						[0, 2, 3, 5, 6],
						[0, 2, 4, 5, 6],
						[0, 3, 4, 5, 6],
						[1, 2, 3, 4, 5],
						[1, 2, 3, 4, 6],
						[1, 2, 3, 5, 6],
						[1, 2, 4, 5, 6],
						[1, 3, 4, 5, 6],
						[2, 3, 4, 5, 6],
						];
							
		var combinations = new Array();
		
		for(var i = 0; i < indices.length; i++) {
			combinations.push	([
								this.cards[indices[i][0]],
								this.cards[indices[i][1]],
								this.cards[indices[i][2]],
								this.cards[indices[i][3]],
								this.cards[indices[i][4]]
								]);
		}
		
		return combinations;
	};
	
	/**
	 * HIGH CARD 0-14
	 */
	this.testForHighCard = function() {
		var strength = 0;
		var combinations = this.getAllCombinations();
		for(var i = 0; i < combinations.length; i++) {
			for(var j = 0; j < combinations[i].length; j++) {
				for(var k = 0; k < combinations[i].length; k++) {
					if(j == k) continue;
					if(combinations[i][j].value > strength)
							strength = combinations[i][j].value;
				}
			}
		}
		return {value : "High Card", strength : strength};
	};

	/**
	 * ONE PAIR 14-28
	 */
	this.testForPair = function() {
		var strength = 0;
		var combinations = this.getAllCombinations();
		for(var i = 0; i < combinations.length; i++) {
			for(var j = 0; j < combinations[i].length; j++) {
				for(var k = 0; k < combinations[i].length; k++) {
					if(j == k) continue;
					if(combinations[i][j].value == combinations[i][k].value && 
						combinations[i][j].value > strength)
							strength = combinations[i][j].value;
				}
			}
		}
		return {value : "One Pair", strength : strength};
	};

	/**
	 * TWO PAIR 28-64
	 */
	this.testForTwoPair = function() {
		onepairexists = this.testForPair();
		
		if(!onepairexists.strength) return {value : "Two Pair", strength : 0};
		
		var strength = 0;
		var combinations = this.getAllCombinations();
		for(var i = 0; i < combinations.length; i++) {
			for(var j = 0; j < combinations[i].length; j++) {
				for(var k = 0; k < combinations[i].length; k++) {
					if(j == k) continue;
					if(combinations[i][j].value == combinations[i][k].value && 
						combinations[i][j].value > strength &&
							combinations[i][j].value != onepairexists.strength)
								strength = combinations[i][j].value + onepairexists.strength;
				}
			}
		}
		return {value : "Two Pair", strength : strength};
	};
	
	/**
	 * THREE OF A KIND 64-78
	 */
	this.testForThreeKind = function() {
		var strength = 0;
		var occurrence = 0;
		var combinations = this.getAllCombinations();
		for(var i = 0; i < combinations.length; i++) {
			for(var j = 0; j < combinations[i].length; j++) {
				for(var k = 0; k < combinations[i].length; k++) {
					if(j == k) continue;
					if(combinations[i][j].value == combinations[i][k].value) {
						if(occurrence++) strength = combinations[i][j].value;
					}
				}
				occurrence = 0;
			}
		}
		return {value : "Three of a Kind", strength : strength};
	};
	
	/**
	 * STRAIGHT 78-92
	 */
	this.testForStraight = function() {
		var strength = 0;
		var values;
		var sorted;
		var occurrence;
		var combinations = this.getAllCombinations();
		for(var i = 0; i < combinations.length; i++) {
			values = new Array();
			for(var j = 0; j < combinations[i].length; j++) {
				values.push(combinations[i][j].value);
			}
			sorted = values.sort(sortNumber);
			occurrence = 0;
			for(var k = 0; k < sorted.length; k++) {
				if(k == 0) continue;
				if((sorted[k-1]+1) == sorted[k]) occurrence++;
			}
			if(occurrence == (sorted.length-1) &&
				sorted[sorted.length-1] > strength) 
					strength = sorted[sorted.length-1];
		}
		return {value : "Straight", strength : strength};
	};
	
	/**
	 * FLUSH 92-96
	 */
	this.testForFlush = function() {
		var strength = 0;
		var occurrence = 0;
		var combinations = this.getAllCombinations();
		for(var i = 0; i < combinations.length; i++) {
			for(var j = 0; j < combinations[i].length; j++) {
				occurrence = 0;
				for(var k = 0; k < combinations[i].length; k++) {
					if(j == k) continue;
					if(combinations[i][j].suit == combinations[i][k].suit)
						occurrence++;
				}
				if(occurrence == 4)
					strength = combinations[i][j].suit;
			}
		}
		return {value : "Flush", strength : strength};
	};
	
	/**
	 * FULL HOUSE 96-124
	 */
	this.testForFullHouse = function() {
		var strength = 0;
		var strength1 = 0;
		var strength2 = 0;
		var occurrence = 0;
		var combinations = this.getAllCombinations();
		for(var i = 0; i < combinations.length; i++) {
			for(var j = 0; j < combinations[i].length; j++) {
				for(var k = 0; k < combinations[i].length; k++) {
					if(j == k) continue;
					if(combinations[i][j].value == combinations[i][k].value) {
						if(occurrence++) strength1 = combinations[i][j].value;
					}
				}
				occurrence = 0;
			}
		}
		for(var i = 0; i < combinations.length; i++) {
			for(var j = 0; j < combinations[i].length; j++) {
				for(var k = 0; k < combinations[i].length; k++) {
					if(j == k) continue;
					if(combinations[i][j].value == combinations[i][k].value && 
						combinations[i][j].value > strength2 &&
							combinations[i][j].value != strength1)
								strength2 = combinations[i][j].value;
				}
			}
		}
		
		if(strength1 && strength2) strength = strength1 + strength2;
		
		return {value : "Full House", strength : strength};
	};
	
	/**
	 * FOUR OF A KIND 124-137
	 */
	this.testForFourKind = function() {
		var strength = 0;
		var occurrence = 0;
		var combinations = this.getAllCombinations();
		for(var i = 0; i < combinations.length; i++) {
			for(var j = 0; j < combinations[i].length; j++) {
				for(var k = 0; k < combinations[i].length; k++) {
					if(j == k) continue;
					if(combinations[i][j].value == combinations[i][k].value) {
						if(occurrence++ > 1) strength = combinations[i][j].value;
					}
				}
				occurrence = 0;
			}
		}
		return {value : "Four of a Kind", strength : strength};
	};
	
	/**
	 * STRAIGHT FLUSH 137-151
	 */
	this.testForStraightFlush = function() {
		var strength = 0;
		
		var exists1 = this.testForStraight();
		var exists2 = this.testForFlush();
		if(exists1.strength && exists2.strength) 
			strength = exists1.strength + exists2.strength;
		
		return {value : "Straight Flush", strength : strength};
	};
}

/**
 * function to be used in engine
 */
function CardSystem() {
	this.eval = new Evaluation();
	
	this.setCards = function(cards) {
		this.eval.setCards(cards);
	};
	
	this.getAllCards = function() {
		var cards = new Array();
		
		for(var i = 2; i < 15; i++) {
			for(var j = 1; j < 5; j++) {
				cards.push(new Card(i, j));
			}
		}
			
		return cards;
	};
	
	this.getValue = function() {
		var hand;
		var exists;
		
		exists = this.eval.testForHighCard();
		if(exists.strength) {
			hand = exists;
		}
		
		exists = this.eval.testForPair();
		if(exists.strength) {
			exists.strength += 14;
			hand = exists;
		}
		
		exists = this.eval.testForTwoPair();
		if(exists.strength) {
			exists.strength += 28;
			hand = exists;
		}
		
		exists = this.eval.testForThreeKind();
		if(exists.strength) {
			exists.strength += 64;
			hand = exists;
		}
		
		exists = this.eval.testForStraight();
		if(exists.strength) {
			exists.strength += 78;
			hand = exists;
		}
		
		exists = this.eval.testForFlush();
		if(exists.strength) {
			exists.strength += 92;
			hand = exists;
		}
		
		exists = this.eval.testForFullHouse();
		if(exists.strength) {
			exists.strength += 96;
			hand = exists;
		}
		
		exists = this.eval.testForFourKind();
		if(exists.strength) {
			exists.strength += 124;
			hand = exists;
		}
		
		exists = this.eval.testForStraightFlush();
		if(exists.strength) {
			exists.strength += 137;
			hand = exists;
		}
		
		return hand;
	};
}