/**
 * Animations.js Default Name 2011 *Default Poker*
 */

function fadePlayer(player) {

	$("#dealoutcard" + (2 * player - 1)).fadeTo(1000, 0.3);
	$("#dealoutcard" + (2 * player)).fadeTo(1000, 0.3);

}

function fadeBackPlayer(player) {

	$("#dealoutcard" + (2 * player - 1)).fadeTo(1000, 1);
	$("#dealoutcard" + (2 * player)).fadeTo(1000, 1);

}

function showPlayers(amount) {
	for (i = 1; i < amount + 1; i++) {
		$("#player" + i).fadeTo(1000, 1);
	}
}

function changePlayerBet(playerNum, newBet) {
	$("#playerbet" + playerNum).html(newBet + " ");
}

function changePlayerName(playerNum, newName) {
	$("div#player" + playerNum + "> div.playername").html(newName);
}

function resetMoney() {
	$(".playersum").html("0 €");
	$("#pot").html("0");
}

function setPot(sum) {
	$("#pot").html(sum + " €");
}

function setPlayerMoney(playerNum, sum) {
	$(
			"div#player" + playerNum
					+ "> div.playerdata > div.playerdetail > div.playersum")
			.html(sum + " €");
}

function addTextToHistory(text) {
	$("#stats").append("Server> " + text + "\n---\n");

	var elem = document.getElementById('stats');
	elem.scrollTop = elem.scrollHeight;
}

function addTextToChat(name, text) {
	$("#chatoutput").append(name + "> " + text + "\n");

	var elem = document.getElementById('chatoutput');
	elem.scrollTop = elem.scrollHeight;
}

function dealCardsToPlayer1(n) {
	$(document).ready(function() {
		$("#dealoutcard1").delay(n).animate({
			opacity : "1",
			left : "-=432",
			top : "+=171",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard2").delay(n + 300).animate({
			opacity : "1",
			left : "-=403",
			top : "+=180",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer1(n) {
	$(document).ready(function() {
		$("#dealoutcard1").delay(n).animate({
			opacity : "1",
			left : "+=432",
			top : "-=171",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard2").delay(n + 300).animate({
			opacity : "1",
			left : "+=403",
			top : "-=180",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCardsToPlayer2(n) {
	$(document).ready(function() {
		$("#dealoutcard3").delay(n).animate({
			opacity : "1",
			left : "-=504",
			top : "-=30",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard4").delay(n + 300).animate({
			opacity : "1",
			left : "-=475",
			top : "-=21",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer2(n) {
	$(document).ready(function() {
		$("#dealoutcard3").delay(n).animate({
			opacity : "1",
			left : "+=504",
			top : "+=30",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard4").delay(n + 300).animate({
			opacity : "1",
			left : "+=475",
			top : "+=21",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCardsToPlayer3(n) {
	$(document).ready(function() {
		$("#dealoutcard5").delay(n).animate({
			opacity : "1",
			left : "-=433",
			top : "-=231",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard6").delay(n + 300).animate({
			opacity : "1",
			left : "-=403",
			top : "-=220",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer3(n) {
	$(document).ready(function() {
		$("#dealoutcard5").delay(n).animate({
			opacity : "1",
			left : "+=433",
			top : "+=231",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard6").delay(n + 300).animate({
			opacity : "1",
			left : "+=403",
			top : "+=220",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCardsToPlayer4(n) {
	$(document).ready(function() {
		$("#dealoutcard7").delay(n).animate({
			opacity : "1",
			left : "-=233",
			top : "-=262",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard8").delay(n + 300).animate({
			opacity : "1",
			left : "-=202",
			top : "-=250",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer4(n) {
	$(document).ready(function() {
		$("#dealoutcard7").delay(n).animate({
			opacity : "1",
			left : "+=233",
			top : "+=262",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard8").delay(n + 300).animate({
			opacity : "1",
			left : "+=202",
			top : "+=250",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCardsToPlayer5(n) {
	$(document).ready(function() {
		$("#dealoutcard9").delay(n).animate({
			opacity : "1",
			left : "-=32",
			top : "-=262",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard10").delay(n + 300).animate({
			opacity : "1",
			left : "-=3",
			top : "-=250",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer5(n) {
	$(document).ready(function() {
		$("#dealoutcard9").delay(n).animate({
			opacity : "1",
			left : "+=32",
			top : "+=262",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard10").delay(n + 300).animate({
			opacity : "1",
			left : "+=3",
			top : "+=250",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCardsToPlayer6(n) {
	$(document).ready(function() {
		$("#dealoutcard11").delay(n).animate({
			opacity : "1",
			left : "+=148",
			top : "-=230",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard12").delay(n + 300).animate({
			opacity : "1",
			left : "+=178",
			top : "-=220",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer6(n) {
	$(document).ready(function() {
		$("#dealoutcard11").delay(n).animate({
			opacity : "1",
			left : "-=148",
			top : "+=230",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard12").delay(n + 300).animate({
			opacity : "1",
			left : "-=178",
			top : "+=220",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCardsToPlayer7(n) {
	$(document).ready(function() {
		$("#dealoutcard13").delay(n).animate({
			opacity : "1",
			left : "+=210",
			top : "-=30",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard14").delay(n + 300).animate({
			opacity : "1",
			left : "+=239",
			top : "-=21",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer7(n) {
	$(document).ready(function() {
		$("#dealoutcard13").delay(n).animate({
			opacity : "1",
			left : "-=210",
			top : "+=30",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard14").delay(n + 300).animate({
			opacity : "1",
			left : "-=239",
			top : "+=21",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCardsToPlayer8(n) {
	$(document).ready(function() {
		$("#dealoutcard15").delay(n).animate({
			opacity : "1",
			left : "+=148",
			top : "+=171",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard16").delay(n + 300).animate({
			opacity : "1",
			left : "+=178",
			top : "+=180",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer8(n) {
	$(document).ready(function() {
		$("#dealoutcard15").delay(n).animate({
			opacity : "1",
			left : "-=148",
			top : "-=171",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard16").delay(n + 300).animate({
			opacity : "1",
			left : "-=178",
			top : "-=180",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCardsToPlayer9(n) {
	$(document).ready(function() {
		$("#dealoutcard17").delay(n).animate({
			opacity : "1",
			left : "-=52",
			top : "+=221",
			height : "-=28",
			width : "-=21"
		}, 1000);
		$("#dealoutcard18").delay(n + 300).animate({
			opacity : "1",
			left : "-=22",
			top : "+=230",
			height : "-=28",
			width : "-=21"
		}, 1000);
	});
}

function unDealCardsToPlayer9(n) {
	$(document).ready(function() {
		$("#dealoutcard17").delay(n).animate({
			opacity : "1",
			left : "+=52",
			top : "-=221",
			height : "+=28",
			width : "+=21"
		}, 1000);
		$("#dealoutcard18").delay(n + 300).animate({
			opacity : "1",
			left : "+=22",
			top : "-=230",
			height : "+=28",
			width : "+=21"
		}, 1000);
	});
}

function dealCards(n) {
	switch (n) {
	case 1:
		dealCardsToPlayer1(300);
		break;
	case 2:
		dealCardsToPlayer1(300);
		dealCardsToPlayer2(600);
		break;
	case 3:
		dealCardsToPlayer1(300);
		dealCardsToPlayer2(600);
		dealCardsToPlayer3(800);
		break;
	case 4:
		dealCardsToPlayer1(300);
		dealCardsToPlayer2(600);
		dealCardsToPlayer3(800);
		dealCardsToPlayer4(1200);
		break;
	case 5:
		dealCardsToPlayer1(300);
		dealCardsToPlayer2(600);
		dealCardsToPlayer3(800);
		dealCardsToPlayer4(1200);
		dealCardsToPlayer5(1500);
		break;
	case 6:
		dealCardsToPlayer1(300);
		dealCardsToPlayer2(600);
		dealCardsToPlayer3(800);
		dealCardsToPlayer4(1200);
		dealCardsToPlayer5(1500);
		dealCardsToPlayer6(1800);
		break;
	case 7:
		dealCardsToPlayer1(300);
		dealCardsToPlayer2(600);
		dealCardsToPlayer3(800);
		dealCardsToPlayer4(1200);
		dealCardsToPlayer5(1500);
		dealCardsToPlayer6(1800);
		dealCardsToPlayer7(2100);
		break;
	case 8:
		dealCardsToPlayer1(300);
		dealCardsToPlayer2(600);
		dealCardsToPlayer3(800);
		dealCardsToPlayer4(1200);
		dealCardsToPlayer5(1500);
		dealCardsToPlayer6(1800);
		dealCardsToPlayer7(2100);
		dealCardsToPlayer8(2400);
		break;
	case 9:
		dealCardsToPlayer1(300);
		dealCardsToPlayer2(600);
		dealCardsToPlayer3(800);
		dealCardsToPlayer4(1200);
		dealCardsToPlayer5(1500);
		dealCardsToPlayer6(1800);
		dealCardsToPlayer7(2100);
		dealCardsToPlayer8(2400);
		dealCardsToPlayer9(2700);
		break;
	}
}

function unDealCards(n) {
	switch (n) {
	case 1:
		unDealCardsToPlayer1(300);
		break;
	case 2:
		unDealCardsToPlayer1(300);
		unDealCardsToPlayer2(600);
		break;
	case 3:
		unDealCardsToPlayer1(300);
		unDealCardsToPlayer2(600);
		unDealCardsToPlayer3(900);
		break;
	case 4:
		unDealCardsToPlayer1(300);
		unDealCardsToPlayer2(600);
		unDealCardsToPlayer3(900);
		unDealCardsToPlayer4(1200);
		break;
	case 5:
		unDealCardsToPlayer1(300);
		unDealCardsToPlayer2(600);
		unDealCardsToPlayer3(900);
		unDealCardsToPlayer4(1200);
		unDealCardsToPlayer5(1500);
		break;
	case 6:
		unDealCardsToPlayer1(300);
		unDealCardsToPlayer2(600);
		unDealCardsToPlayer3(900);
		unDealCardsToPlayer4(1200);
		unDealCardsToPlayer5(1500);
		unDealCardsToPlayer6(1800);
		break;
	case 7:
		unDealCardsToPlayer1(300);
		unDealCardsToPlayer2(600);
		unDealCardsToPlayer3(900);
		unDealCardsToPlayer4(1200);
		unDealCardsToPlayer5(1500);
		unDealCardsToPlayer6(1800);
		unDealCardsToPlayer7(2100);
		break;
	case 8:
		unDealCardsToPlayer1(300);
		unDealCardsToPlayer2(600);
		unDealCardsToPlayer3(900);
		unDealCardsToPlayer4(1200);
		unDealCardsToPlayer5(1500);
		unDealCardsToPlayer6(1800);
		unDealCardsToPlayer7(2100);
		unDealCardsToPlayer8(2400);
		break;
	case 9:
		unDealCardsToPlayer1(300);
		unDealCardsToPlayer2(600);
		unDealCardsToPlayer3(900);
		unDealCardsToPlayer4(1200);
		unDealCardsToPlayer5(1500);
		unDealCardsToPlayer6(1800);
		unDealCardsToPlayer7(2100);
		unDealCardsToPlayer8(2400);
		unDealCardsToPlayer9(2700);
		break;
	}
}

function dealTableCards(n) {
	$(document).ready(function() {
		$("#dealoutcard19").delay(n).animate({
			left : "-=300"
		}, 1000);
		$("#dealoutcard20").delay(n + 300).animate({
			left : "-=225"
		}, 1000);
		$("#dealoutcard21").delay(n + 600).animate({
			left : "-=150"
		}, 1000);
		$("#dealoutcard22").delay(n + 900).animate({
			left : "-=75"
		}, 1000);
	});
}

function unDealTableCards(n) {
	$(document).ready(function() {
		$("#dealoutcard19").delay(n).animate({
			left : "+=300"
		}, 1000);
		$("#dealoutcard20").delay(n + 300).animate({
			left : "+=225"
		}, 1000);
		$("#dealoutcard21").delay(n + 600).animate({
			left : "+=150"
		}, 1000);
		$("#dealoutcard22").delay(n + 900).animate({
			left : "+=75"
		}, 1000);
	});
}

function showAnnouncement(duration, textsize, text) {
	$(document).ready(function() {
		$("#announcement").css("font-size", textsize + "px");
		$("#announcement").html(text);
		$("#announcement").delay(duration).fadeTo(800, 0, function() {
			$("#announcement").html("");
		});
		$("#announcement").fadeTo(0, 100);
	});
}

function changeDisplay(player, choice) {
	$(document)
			.ready(
					function() {
						$("#player" + player).children(".playerdata").children(
								".playerdisplay").children(
								".playerdisplayimage")
								.fadeTo(
										500,
										0.0,
										function() {
											$("#player" + player).children(
													".playerdata").children(
													".playerdisplay").children(
													".playerdisplayimage")
													.attr(
															"src",
															"images/display"
																	+ choice
																	+ ".png");
										});
						$("#player" + player).children(".playerdata").children(
								".playerdisplay").children(
								".playerdisplayimage").fadeTo(3000, 100.0);
					});
}

function hidePlayer(player) {
	$(document).ready(function() {
		$("#player" + player).fadeOut(600);
	});
	setTimeout("removePlayer(player)", 900);
}

function removePlayer(player) {
	$(document).ready(function() {
		$("#player" + player).remove();
	});
}

function hidePlayerButtons(i) {
	if (i == true) {
		$("#ourbuttons").hide('slow', function() {
		});
	}
	if (i == false) {
		$("#ourbuttons").show(600);
	}
}

function hidePlayers(number) {

	for ( var i = 0; i < number; i++) {
		hidePlayer(9 - i);
	}

}

function flipCards(player, card1, card2) {

	$("#dealoutcard" + (2 * player - 1)).attr("src",
			"images/cards/" + card1 + ".png");
	$("#dealoutcard" + (2 * player)).attr("src",
			"images/cards/" + card2 + ".png");

}

function flipFlop(card1, card2, card3) {
	$(document).ready(function() {
		$("#dealoutcard19").attr("src", "images/cards/" + card1 + ".png");
		$("#dealoutcard20").attr("src", "images/cards/" + card2 + ".png");
		$("#dealoutcard21").attr("src", "images/cards/" + card3 + ".png");
	});
}

function flipTurn(card) {
	$(document).ready(function() {
		$("#dealoutcard22").attr("src", "images/cards/" + card + ".png");
	});
}

function flipRiver(card) {
	$(document).ready(function() {
		$("#dealoutcard23").attr("src", "images/cards/" + card + ".png");
	});
}

function cardsBackside() {
	$(document).ready(function() {
		for (i = 1; i < 24; i++) {
			$("#dealoutcard" + i).attr("src", "images/cardBackSide.png");
		}
	});
}

function setDealer(player) {
	clearDealer();
	$(document).ready(
			function() {
				$("#player" + player).children(".playerdata").children(
						".playerdetail").children(".playerstatus").children(
						".playerstatusimage").show();
			});

}

function clearDealer() {
	for (i = 1; i <= 9; i++) {
		$(document).ready(
				function() {
					$("#player" + i).children(".playerdata").children(
							".playerdetail").children(".playerstatus")
							.children(".playerstatusimage").hide();
				});
	}
}
