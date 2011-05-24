
/**
 * UI controller
 */

var playerAmount = 0; // local variable for UI actions

function initGame() {
	initDisplay();
	
	startUpdater();
	spectate();
}

function initDisplay() {
	// hidePlayers(9);
}

function startUpdater() {
	// setInterval('getNewInfoAndUpdateUI()', 600);
	getNewInfoAndUpdateUI();
}

/* ===========Click handlers===========*/

$(document).ready(function() {
	$("#newgamebutton").click(function() {
		joinGame();
	});

	$("#exitbutton").click(function() {
		$.ajax({
			type: "POST",
			url: "server",
			data: "task=starthand",
			cache: false,
			success: function(result){
				}
			});
	});
	
	$("#buttonfold").click(function() {
		$.ajax({
			type: "POST",
			url: "server",
			data: "task=fold",
			cache: false,
			success: function(result){
				}
			});
	});
	
	$("#buttoncall").click(function() {
		$.ajax({
			type: "POST",
			url: "server",
			data: "task=call",
			cache: false,
			success: function(result){
				}
			});
	});
	
	$("#buttonraise").click(function() {
		$.ajax({
			type: "POST",
			url: "server",
			data: "task=raise",
			cache: false,
			success: function(result){
				}
			});
	});

	$("#usermsg").keypress(function(event) {
		if(event.which == "13") {
			$("#submitmsg").click();
		}
	});
	
	$("#submitmsg").click(function() {
		chat();
	});
});

/* ===========Events===========*/

function spectate() {
	$.ajax({
		type: "POST",
		url: "server",
		data: "task=spec",
		cache: false,
		success: function(result){
			
			}
		});
}

function joinGame() {
	var name = prompt("What is your name", "name");
	
	$.ajax({
		type: "POST",
		url: "server",
		data: "task=join&name=" + name,
		cache: false,
		success: function(result){
			
			}
		});
}

function getNewInfoAndUpdateUI() {
	$.ajax({
		type: "GET",
		url: "server",
		data: "task=getinfo",
		cache: false,
		success: function(result){
			processData(result);
			getNewInfoAndUpdateUI();
		 }
		});
}

function chat() {
	var message = $("#usermsg").val();
	
	$.ajax({
		url: "server",
		data: "task=chat&message=" + message,
		cache: false,
		success: function(result){
			$("#usermsg").val("");
			}
		});
}

/* ===========Result data processing===========*/

function processData(data) {
	var parsedData = jsonParse(data);
	var infoType = parsedData.type;
	var infoData = String(parsedData.data);
	var infoName = parsedData.name;
	var infoId = String(parsedData.id);
	
	// PLAYER NAMES
	if(infoType == "players") {
		var playerData = infoData.split(",");
		var players = new Array();
		
		for(var i = 0; i < playerData.length; i++) {
			players.push(playerData[i]);
		}
		
		playerAmount = players.length;
		
		updatePlayers(players);
		
	// ROUND NAME
	} else if(infoType == "round") {
		updateRound(infoData);
	
	// PLAYER CARDS
	} else if(infoType == "playercards") {
		var playerCards = infoData.split(",");
		var cards = new Array();
		
		for(var i = 0; i < playerCards.length; i++) {
			cards.push(playerCards[i]);
		}
		
		updateCards(infoId, cards);
		setTimeout('dealCards(' + playerAmount + ')', 1400);
		
	// DEALER
	} else if(infoType == "dealer") {	
		updateDealer(infoId);

	// BET
	} else if(infoType == "bet") {	
		updateBet(infoId, infoData);
		
	// FOLD/CALL/BET
	} else if(infoType == "status") {	
		updateStatus(infoId, infoName);
		
	// RESET STATUS
	} else if(infoType == "resetstatus") {	
		updateResetStatus();
		
	// SYSTEM MESSAGE
	} else if(infoType == "message") {	
		updateMessage(infoData);
		
	// FLOP
	} else if(infoType == "flop") {	
		var tableCards = infoData.split(",");
		var cards = new Array();
		
		for(var i = 0; i < tableCards.length; i++) {
			cards.push(tableCards[i]);
		}
		
		updateFlop(cards);
		
	// TURN
	} else if(infoType == "turn") {	
		var tableCards = infoData.split(",");
		var cards = new Array();
		
		for(var i = 0; i < tableCards.length; i++) {
			cards.push(tableCards[i]);
		}
		
		updateTurn(cards);
		
	// RIVER
	} else if(infoType == "river") {	
		var tableCards = infoData.split(",");
		var cards = new Array();
		
		for(var i = 0; i < tableCards.length; i++) {
			cards.push(tableCards[i]);
		}
		
		updateRiver(cards);
		
	// CHAT
	} else if(infoType == "chat") {	
		updateChat(infoName, infoData);
		
	// POT
	} else if(infoType == "pot") {	
		updatePot(infoData);
		
	// WINNER NAME
	} else if(infoType == "showdown") {	
		updateWinner(infoName);
	
	// SHOWDOWN CARDS
	} else if(infoType == "otherscards") {	
		var playerCards = infoData.split(",");
		var cards = new Array();
		
		for(var i = 0; i < playerCards.length; i++) {
			cards.push(playerCards[i]);
		}
		
		updateCards(infoId, cards);
	}
}

/* ===========UI actions===========*/

function updatePlayers(players) {
	showPlayers(9);
	hidePlayers(9 - players.length);
	
	for(var i = 0; i < players.length; i++) {
		changePlayerName(i+1, players[i]);
	}
}

function updateRound(round) {
	showAnnouncement(4000, 26, round);
}

function updateCards(id, cards) {
	var mappedCards = new Array();
	
	for(var i = 0; i < cards.length; i++) {
		mappedCards.push(getCardMapping(cards[i]));
	}
	
	flipCards(Number(id)+1, mappedCards[0], mappedCards[1]);
}

function updateDealer(id) {
	setDealer(Number(id)+1);
}

function updateBet(id, amount) {
	changePlayerBet(Number(id)+1, amount);
}

function updateStatus(id, status) {
	if(status == "Fold")
		fadePlayer(Number(id)+1);
	changeDisplay(Number(id)+1, status);
}

function updateMessage(message) {
	addTextToHistory(message);
}

function updateFlop(cards) {
	dealTableCards(0);
	
	var mappedCards = new Array();
	
	for(var i = 0; i < cards.length; i++) {
		mappedCards.push(getCardMapping(cards[i]));
	}
	
	flipFlop(mappedCards[0], mappedCards[1], mappedCards[2]);
}

function updateTurn(cards) {	
	var mappedCards = new Array();
	
	for(var i = 0; i < cards.length; i++) {
		mappedCards.push(getCardMapping(cards[i]));
	}
	
	flipTurn(mappedCards[0]);
}

function updateRiver(cards) {	
	var mappedCards = new Array();
	
	for(var i = 0; i < cards.length; i++) {
		mappedCards.push(getCardMapping(cards[i]));
	}
	
	flipRiver(mappedCards[0]);
}

function updateChat(name, message) {
	addTextToChat(name, message);
}

function updatePot(amount) {
	setPot(amount);
}

function updateWinner(name) {
	showAnnouncement(6000, 26, name);
	
	setTimeout('unDealCards(' + playerAmount + ')', 1400);
	unDealTableCards(0);
	setTimeout('cardsBackside()', 800);
}

function updateResetStatus() {
	for(var i = 0; i < playerAmount; i++) {
		changeDisplay(i+1, "Idle");
	}
}

/* ===========Misc===========*/

function getCardMapping(card) {
	var valuehash = {
			0 : 'Ace',
			1 : 'Two',
			2 : 'Three',
			3 : 'Four',
			4 : 'Five',
			5 : 'Six',
			6 : 'Seven',
			7 : 'Eight',
			8 : 'Nine',
			9 : 'Ten',
			10 : 'Jack',
			11 : 'Queen',
			12 : 'King'
		};

	var suithash = {
			0 : 'diamonds', 
			1 : 'spades',
			2 : 'hearts',
			3 : 'clubs'
		};
	
	var splittedCard = card.split("-");
	
	return suithash[Number(splittedCard[1])]+valuehash[Number(splittedCard[0])];
}