/**
 * 
 */

function resetMoney() {
	$(".playersum").html("0 €");
	$("#pot").html("0 €");
	}

function changeOurDisplay(choice) {
	$(document).ready(function(){
		$("#ourdisplayimage").fadeTo(400,0.0, function(){
			$("#ourdisplayimage").attr("src","images/display" + choice + ".png");
		});
		$("#ourdisplayimage").fadeTo(500,100.0);
	});
}

function dealCards(n) {
	switch (n){

	case 1:
		$(document).ready(function(){
			dealOurCards(0)
			dealCardsToPlayer6(600);
			dealTableCards(1200);
		});
		break;
	case 2:
		$(document).ready(function(){
			dealOurCards(0)
			dealCardsToPlayer6(600);
			dealCardsToPlayer5(1200);
			dealTableCards(1800);
		});
		break;
	case 3:
		$(document).ready(function(){
			dealOurCards(0)
			dealCardsToPlayer6(600);
			dealCardsToPlayer5(1200);
			dealCardsToPlayer4(1800);
			dealTableCards(2400);
		});
		break;
	case 4:
		$(document).ready(function(){
			dealOurCards(0)
			dealCardsToPlayer6(600);
			dealCardsToPlayer5(1200);
			dealCardsToPlayer4(1800);
			dealCardsToPlayer3(2400);
			dealTableCards(3000);
		});
		break;
	case 5:
		$(document).ready(function(){
			dealOurCards(0)
			dealCardsToPlayer7(600);
			dealCardsToPlayer6(1200);
			dealCardsToPlayer5(1800);
			dealCardsToPlayer4(2400);
			dealCardsToPlayer3(3000);
			dealTableCards(3600);
		});
		break;
	case 6:
		$(document).ready(function(){
			dealOurCards(0)
			dealCardsToPlayer7(600);
			dealCardsToPlayer6(1200);
			dealCardsToPlayer5(1800);
			dealCardsToPlayer4(2400);
			dealCardsToPlayer3(3000);
			dealCardsToPlayer2(3600);
			dealTableCards(4200);
		});
		break;
	case 7:
		$(document).ready(function(){
			dealOurCards(0)
			dealCardsToPlayer7(600);
			dealCardsToPlayer6(1200);
			dealCardsToPlayer5(1800);
			dealCardsToPlayer4(2400);
			dealCardsToPlayer3(3000);
			dealCardsToPlayer2(3600);
			dealCardsToPlayer1(4200);
			dealTableCards(4800);
		});
		break;
	case 8:
		$(document).ready(function(){
			dealOurCards(0)
			dealCardsToPlayer8(600);
			dealCardsToPlayer7(1200);
			dealCardsToPlayer6(1800);
			dealCardsToPlayer5(2400);
			dealCardsToPlayer4(3000);
			dealCardsToPlayer3(3600);
			dealCardsToPlayer2(4200);
			dealCardsToPlayer1(4800);
			dealTableCards(5400);
		});
		break;
	}
}

function unDealCards(n) {
	switch (n){

	case 1:
		$(document).ready(function(){
			unDealCardsToPlayer6(0);
			unDealTableCards(600);
		});
		break;
	case 2:
		$(document).ready(function(){
			unDealCardsToPlayer6(0);
			unDealCardsToPlayer5(600);
			unDealTableCards(1200);
		});
		break;
	case 3:
		$(document).ready(function(){
			unDealCardsToPlayer6(0);
			unDealCardsToPlayer5(600);
			unDealCardsToPlayer4(1200);
			unDealTableCards(1800);
		});
		break;
	case 4:
		$(document).ready(function(){
			unDealCardsToPlayer6(0);
			unDealCardsToPlayer5(600);
			unDealCardsToPlayer4(1200);
			unDealCardsToPlayer3(1800);
			unDealTableCards(2400);
		});
		break;
	case 5:
		$(document).ready(function(){
			unDealCardsToPlayer7(0);
			unDealCardsToPlayer6(600);
			unDealCardsToPlayer5(1200);
			unDealCardsToPlayer4(1800);
			unDealCardsToPlayer3(2400);
			unDealTableCards(3000);
		});
		break;
	case 6:
		$(document).ready(function(){
			unDealCardsToPlayer7(0);
			unDealCardsToPlayer6(600);
			unDealCardsToPlayer5(1200);
			unDealCardsToPlayer4(1800);
			unDealCardsToPlayer3(2400);
			unDealCardsToPlayer2(3000);
			unDealTableCards(3600);
		});
		break;
	case 7:
		$(document).ready(function(){
			unDealCardsToPlayer7(0);
			unDealCardsToPlayer6(600);
			unDealCardsToPlayer5(1200);
			unDealCardsToPlayer4(1800);
			unDealCardsToPlayer3(2400);
			unDealCardsToPlayer2(3000);
			unDealCardsToPlayer1(3600);
			unDealTableCards(4200);
		});
		break;
	case 8:
		$(document).ready(function(){
			unDealCardsToPlayer8(0);
			unDealCardsToPlayer7(600);
			unDealCardsToPlayer6(1200);
			unDealCardsToPlayer5(1800);
			unDealCardsToPlayer4(2400);
			unDealCardsToPlayer3(3000);
			unDealCardsToPlayer2(3600);
			unDealCardsToPlayer1(4200);
			unDealTableCards(4800);
		});
		break;
	}
}

function dealOurCards(n) {

	$(document).ready(function(){
		$("#dealourcard1").delay(n).animate({opacity: "1", left: "-=153", top: "+=219", height: "+=23", width: "+=18"}, 1000);
		$("#dealourcard2").delay(n+300).animate({opacity: "1", left: "-=55", top: "+=219", height: "+=23", width: "+=18"}, 1000);
	});
}

function unDealOurCards(n) {

	$(document).ready(function(){
		$("#dealourcard1").delay(n).animate({opacity: "1", left: "+=153", top: "-=219", height: "-=23", width: "-=18"}, 1000);
		$("#dealourcard2").delay(n+300).animate({opacity: "1", left: "+=55", top: "-=219", height: "-=23", width: "-=18"}, 1000);
	});
}

function dealCardsToPlayer1(n) {

	$(document).ready(function(){
		$("#dealoutcard13").delay(n).animate({opacity: "1", left: "-=432", top: "+=171", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard14").delay(n+300).animate({opacity: "1", left: "-=403", top: "+=180", height: "-=28", width: "-=21"}, 1000);
	});
}

function unDealCardsToPlayer1(n) {

	$(document).ready(function(){
		$("#dealoutcard13").delay(n).animate({opacity: "1", left: "+=432", top: "-=171", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard14").delay(n+300).animate({opacity: "1", left: "+=403", top: "-=180", height: "+=28", width: "+=21"}, 1000);
	});
}

function dealCardsToPlayer2(n) {

	$(document).ready(function(){
		$("#dealoutcard11").delay(n).animate({opacity: "1", left: "-=504", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard12").delay(n+300).animate({opacity: "1", left: "-=475", top: "-=21", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer2(n) {

	$(document).ready(function(){
		$("#dealoutcard11").delay(n).animate({opacity: "1", left: "+=504", top: "+=30", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard12").delay(n+300).animate({opacity: "1", left: "+=475", top: "+=21", height: "+=28", width: "+=21"}, 1000);

		
	});
}

function dealCardsToPlayer3(n) {

	$(document).ready(function(){
		$("#dealoutcard9").delay(n).animate({opacity: "1", left: "-=433", top: "-=231", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard10").delay(n+300).animate({opacity: "1", left: "-=403", top: "-=220", height: "-=28", width: "-=21"}, 1000);

		
	});
}

function unDealCardsToPlayer3(n) {

	$(document).ready(function(){
		$("#dealoutcard9").delay(n).animate({opacity: "1", left: "+=433", top: "+=231", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard10").delay(n+300).animate({opacity: "1", left: "+=403", top: "+=220", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer4(n) {

	$(document).ready(function(){
		$("#dealoutcard7").delay(n).animate({opacity: "1", left: "-=233", top: "-=262", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard8").delay(n+300).animate({opacity: "1", left: "-=202", top: "-=250", height: "-=28", width: "-=21"}, 1000);

		
	});
}

function unDealCardsToPlayer4(n) {

	$(document).ready(function(){
		$("#dealoutcard7").delay(n).animate({opacity: "1", left: "+=233", top: "+=262", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard8").delay(n+300).animate({opacity: "1", left: "+=202", top: "+=250", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer5(n) {

	$(document).ready(function(){
		$("#dealoutcard5").delay(n).animate({opacity: "1", left: "-=32", top: "-=262", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard6").delay(n+300).animate({opacity: "1", left: "-=3", top: "-=250", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer5(n) {

	$(document).ready(function(){
		$("#dealoutcard5").delay(n).animate({opacity: "1", left: "+=32", top: "+=262", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard6").delay(n+300).animate({opacity: "1", left: "+=3", top: "+=250", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer6(n) {

	$(document).ready(function(){
		$("#dealoutcard3").delay(n).animate({opacity: "1", left: "+=148", top: "-=230", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard4").delay(n+300).animate({opacity: "1", left: "+=178", top: "-=220", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer6(n) {

	$(document).ready(function(){
		$("#dealoutcard3").delay(n).animate({opacity: "1", left: "-=148", top: "+=230", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard4").delay(n+300).animate({opacity: "1", left: "-=178", top: "+=220", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer7(n) {

	$(document).ready(function(){
		$("#dealoutcard1").delay(n).animate({opacity: "1", left: "+=210", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard2").delay(n+300).animate({opacity: "1", left: "+=239", top: "-=21", height: "-=28", width: "-=21"}, 1000);		

		
	});
}

function unDealCardsToPlayer7(n) {

	$(document).ready(function(){
		$("#dealoutcard1").delay(n).animate({opacity: "1", left: "-=210", top: "+=30", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard2").delay(n+300).animate({opacity: "1", left: "-=239", top: "+=21", height: "+=28", width: "+=21"}, 1000);		
		
	});
}

function dealCardsToPlayer8(n) {

	$(document).ready(function(){
		$("#dealoutcard15").delay(n).animate({opacity: "1", left: "+=148", top: "+=171", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard16").delay(n+300).animate({opacity: "1", left: "+=178", top: "+=180", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer8(n) {

	$(document).ready(function(){
		$("#dealoutcard15").delay(n).animate({opacity: "1", left: "-=148", top: "-=171", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard16").delay(n+300).animate({opacity: "1", left: "-=178", top: "-=180", height: "+=28", width: "+=21"}, 1000);
		
	});
}


function dealTableCards(n) {

	$(document).ready(function(){
		$("#dealoutcard17").delay(n).animate({ left: "-=75" }, 1000);
		$("#dealoutcard18").delay(n+300).animate({ left: "-=150" }, 1000);
		$("#dealoutcard19").delay(n+600).animate({ left: "-=225" }, 1000);
		$("#dealoutcard20").delay(n+900).animate({ left: "-=300" }, 1000);
	});
}

function unDealTableCards(n) {

	$(document).ready(function(){
		$("#dealoutcard17").delay(n).animate({ left: "+=75" }, 1000);
		$("#dealoutcard18").delay(n+300).animate({ left: "+=150" }, 1000);
		$("#dealoutcard19").delay(n+600).animate({ left: "+=225" }, 1000);
		$("#dealoutcard20").delay(n+900).animate({ left: "+=300" }, 1000);
	});
}

function showAnnouncement(text) {
	$(document).ready(function(){
		$("#announcement").html(text);
		$("#announcement").delay(600).fadeTo(800, 0, function(){
			$("#announcement").html("");
		});
		$("#announcement").fadeTo(0, 100);
	});
}

function changeDisplay(player, choice){
	$(document).ready(function(){
		$("#player"+player).children(".playerdata").children(".playerdisplay")
		.children(".playerdisplayimage").fadeTo(500,0.0, function(){
			$("#player"+player).children(".playerdata").children(".playerdisplay")
			.children(".playerdisplayimage").attr("src","images/display" + choice + ".png");
		});
		$("#player"+player).children(".playerdata").children(".playerdisplay")
		.children(".playerdisplayimage").fadeTo(3000,100.0);
	});
}

function hidePlayer(player) {
	$(document).ready(function(){
		$("#player"+player).hide();
	});
}

function hidePlayers(number) {
	switch (number){
	case 0:
		break;
	case 1:
		hidePlayer(8);
		break;
	case 2:
		hidePlayer(1);
		hidePlayer(8);
		break;
	case 3:
		hidePlayer(1);
		hidePlayer(2);
		hidePlayer(8);
		break;
	case 4:
		hidePlayer(1);
		hidePlayer(2);
		hidePlayer(7);
		hidePlayer(8);
		break;
	case 5:
		hidePlayer(1);
		hidePlayer(2);
		hidePlayer(3);
		hidePlayer(7);
		hidePlayer(8);
		break;
	case 6:
		hidePlayer(1);
		hidePlayer(2);
		hidePlayer(3);
		hidePlayer(4);
		hidePlayer(7);
		hidePlayer(8);
		break;
	case 7:
		hidePlayer(1);
		hidePlayer(2);
		hidePlayer(3);
		hidePlayer(4);
		hidePlayer(5);
		hidePlayer(7);
		hidePlayer(8);
		break;
	}
}

function showPlayerNumberDialog() {
	var playernumber = prompt("Please enter number of players (1-8).","");
	//if (playernumber!=null && playernumber!="" && playernumber!="1-8") {
	return playernumber;
	//}
}

function flipCards(player, card1, card2) {
	switch (player){
	case 1:
		$(document).ready(function(){
			$("#dealoutcard13").attr("src", "images/cards/" + card1 + ".png");
			$("#dealoutcard14").attr("src", "images/cards/" + card2 + ".png");
		});
		break;
	case 2:
		$(document).ready(function(){
			$("#dealoutcard11").attr("src", "images/cards/" + card1 + ".png");
			$("#dealoutcard12").attr("src", "images/cards/" + card2 + ".png");
		});
		break;
	case 3:
		$(document).ready(function(){
			$("#dealoutcard9").attr("src", "images/cards/" + card1 + ".png");
			$("#dealoutcard10").attr("src", "images/cards/" + card2 + ".png");
		});
		break;
	case 4:
		$(document).ready(function(){
			$("#dealoutcard7").attr("src", "images/cards/" + card1 + ".png");
			$("#dealoutcard8").attr("src", "images/cards/" + card2 + ".png");
		});
		break;
	case 5:
		$(document).ready(function(){
			$("#dealoutcard5").attr("src", "images/cards/" + card1 + ".png");
			$("#dealoutcard6").attr("src", "images/cards/" + card2 + ".png");
		});
		break;
	case 6:
		$(document).ready(function(){
			$("img#dealoutcard3").attr("src", "images/cards/" + card1 + ".png");
			$("img#dealoutcard4").attr("src", "images/cards/" + card2 + ".png");
		});
		break;
	case 7:
		$(document).ready(function(){
			$("#dealoutcard1").attr("src", "images/cards/" + card1 + ".png");
			$("#dealoutcard2").attr("src", "images/cards/" + card2 + ".png");
		});
		break;
	case 8:
		$(document).ready(function(){
			$("#dealoutcard15").attr("src", "images/cards/" + card1 + ".png");
			$("#dealoutcard16").attr("src", "images/cards/" + card2 + ".png");
		});
		break;
	}
}

function setDealer(player) {
	clearDealer();
	$(document).ready(function(){
		$("#player"+player).children(".playerdata").children(".playerdetail")
		.children(".playerstatus").children(".playerstatusimage")
		.show();
	});

}

function clearDealer() {
	for (i=1;i<=8;i++){
		$(document).ready(function(){
			$("#player"+i).children(".playerdata").children(".playerdetail")
			.children(".playerstatus").children(".playerstatusimage")
			.hide();
		});
	}
}

$(document).ready(function(){
	changeDisplay(1,"Idle");
	changeDisplay(2,"Idle");
	changeDisplay(3,"Idle");
	changeDisplay(4,"Idle");
	changeDisplay(5,"Idle");
	changeDisplay(6,"Idle");
	changeDisplay(7,"Idle");
	changeDisplay(8,"Idle");
	$("#newgamebutton").click(function(){
		setDealer(6);
		var players = showPlayerNumberDialog();
		hidePlayers(8-players);
		dealCards(parseInt(players));
		unDealCards(parseInt(players));
		resetMoney();
		startNewGameClicked();
		showAnnouncement("Preflop");
	});
	
	$("#exitbutton").click(function(){
		if (confirm("Getting a life?"))
		{
			window.close();
		}
	});
	
	$("#buttonfold").click(function(){
		changeOurDisplay("Fold");
		changeDisplay(1, "Fold");
		changeDisplay(2, "Fold");
		changeDisplay(3, "Fold");
		changeDisplay(4, "Fold");
		changeDisplay(5, "Fold");
		changeDisplay(6, "Fold");
		changeDisplay(7, "Fold");
		changeDisplay(8, "Fold");
		flipCards(1, "diamondsAce", "clubsThree");
		flipCards(2, "diamondsAce", "clubsThree");
		flipCards(3, "diamondsAce", "clubsThree");
		flipCards(4, "diamondsAce", "clubsThree");
		flipCards(5, "diamondsAce", "clubsThree");
		flipCards(6, "diamondsAce", "clubsThree");
		flipCards(7, "diamondsAce", "clubsThree");
		flipCards(8, "diamondsAce", "clubsThree");
	});
	
	$("#buttoncall").click(function(){
		setDealer(8);
		changeOurDisplay("Call");
	});
	
	$("#buttonraise").click(function(){
		changeOurDisplay("Raise");
	});
	
});