/**
 * 
 */

function resetMoney() {
	$(".playersum").html("0 €");
	$("#pot").html("0 €");
	}

function ourDisplayToFold() {
	$(document).ready(function(){
		$("#ourdisplayimage").fadeTo(400,0.0, function(){
			$("#ourdisplayimage").attr("src","images/displayFold.png");
			});
		$("#ourdisplayimage").fadeTo(500,100.0);
		return false;
	});
}

function ourDisplayToCall() {
	$(document).ready(function(){
		$("#ourdisplayimage").fadeTo(400,0.0, function(){
			$("#ourdisplayimage").attr("src","images/displayCall.png");
			});
		$("#ourdisplayimage").fadeTo(500,100.0);
		return false;
	});
}

function ourDisplayToRaise() {
	$(document).ready(function(){
		$("#ourdisplayimage").fadeTo(400,0.0, function(){
			$("#ourdisplayimage").attr("src","images/displayRaise.png");
			});
		$("#ourdisplayimage").fadeTo(500,100.0);
		return false;
	});
}

function dealCards(n) {
	switch (n){

	case 1:
		$(document).ready(function(){
			dealCardsToPlayer6(0);
			dealTableCards(600);
		});
		break;
	case 2:
		$(document).ready(function(){
			dealCardsToPlayer6(0);
			dealCardsToPlayer5(600);
			dealTableCards(1200);
		});
		break;
	case 3:
		$(document).ready(function(){
			dealCardsToPlayer6(0);
			dealCardsToPlayer5(600);
			dealCardsToPlayer4(1200);
			dealTableCards(1800);
		});
		break;
	case 4:
		$(document).ready(function(){
			dealCardsToPlayer6(0);
			dealCardsToPlayer5(600);
			dealCardsToPlayer4(1200);
			dealCardsToPlayer3(1800);
			dealTableCards(2400);
		});
		break;
	case 5:
		$(document).ready(function(){
			dealCardsToPlayer7(0);
			dealCardsToPlayer6(600);
			dealCardsToPlayer5(1200);
			dealCardsToPlayer4(1800);
			dealCardsToPlayer3(2400);
			dealTableCards(3000);
		});
		break;
	case 6:
		$(document).ready(function(){
			dealCardsToPlayer7(0);
			dealCardsToPlayer6(600);
			dealCardsToPlayer5(1200);
			dealCardsToPlayer4(1800);
			dealCardsToPlayer3(2400);
			dealCardsToPlayer2(3000);
			dealTableCards(3600);
		});
		break;
	case 7:
		$(document).ready(function(){
			dealCardsToPlayer7(0);
			dealCardsToPlayer6(600);
			dealCardsToPlayer5(1200);
			dealCardsToPlayer4(1800);
			dealCardsToPlayer3(2400);
			dealCardsToPlayer2(3000);
			dealCardsToPlayer1(3600);
			dealTableCards(4200);
		});
		break;
	case 8:
		$(document).ready(function(){
			dealCardsToPlayer8(0);
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
		$("#dealourcard1").delay(n).animate({opacity: "1", left: "-=403", top: "+=180", height: "-=28", width: "-=21"}, 1000);
		$("#dealourcard2").delay(n+300).animate({opacity: "1", left: "-=432", top: "+=171", height: "-=28", width: "-=21"}, 1000);
	});
}

function dealCardsToPlayer1(n) {

	$(document).ready(function(){
		$("#dealoutcard13").delay(n).animate({opacity: "1", left: "-=403", top: "+=180", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard14").delay(n+300).animate({opacity: "1", left: "-=432", top: "+=171", height: "-=28", width: "-=21"}, 1000);
	});
}

function unDealCardsToPlayer1(n) {

	$(document).ready(function(){
		$("#dealoutcard13").delay(n).animate({opacity: "1", left: "+=403", top: "-=180", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard14").delay(n+300).animate({opacity: "1", left: "+=432", top: "-=171", height: "+=28", width: "+=21"}, 1000);
	});
}

function dealCardsToPlayer2(n) {

	$(document).ready(function(){
		$("#dealoutcard11").delay(n).animate({opacity: "1", left: "-=475", top: "-=21", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard12").delay(n+300).animate({opacity: "1", left: "-=504", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer2(n) {

	$(document).ready(function(){
		$("#dealoutcard11").delay(n).animate({opacity: "1", left: "+=475", top: "+=21", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard12").delay(n+300).animate({opacity: "1", left: "+=504", top: "+=30", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer3(n) {

	$(document).ready(function(){
		$("#dealoutcard9").delay(n).animate({opacity: "1", left: "-=403", top: "-=220", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard10").delay(n+300).animate({opacity: "1", left: "-=433", top: "-=231", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer3(n) {

	$(document).ready(function(){
		$("#dealoutcard9").delay(n).animate({opacity: "1", left: "+=403", top: "+=220", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard10").delay(n+300).animate({opacity: "1", left: "+=433", top: "+=231", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer4(n) {

	$(document).ready(function(){
		$("#dealoutcard7").delay(n).animate({opacity: "1", left: "-=202", top: "-=250", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard8").delay(n+300).animate({opacity: "1", left: "-=233", top: "-=262", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer4(n) {

	$(document).ready(function(){
		$("#dealoutcard7").delay(n).animate({opacity: "1", left: "+=202", top: "+=250", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard8").delay(n+300).animate({opacity: "1", left: "+=233", top: "+=262", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer5(n) {

	$(document).ready(function(){
		$("#dealoutcard5").delay(n).animate({opacity: "1", left: "-=3", top: "-=250", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard6").delay(n+300).animate({opacity: "1", left: "-=32", top: "-=262", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer5(n) {

	$(document).ready(function(){
		$("#dealoutcard5").delay(n).animate({opacity: "1", left: "+=3", top: "+=250", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard6").delay(n+300).animate({opacity: "1", left: "+=32", top: "+=262", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer6(n) {

	$(document).ready(function(){
		$("#dealoutcard3").delay(n).animate({opacity: "1", left: "+=178", top: "-=220", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard4").delay(n+300).animate({opacity: "1", left: "+=148", top: "-=230", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer6(n) {

	$(document).ready(function(){
		$("#dealoutcard3").delay(n).animate({opacity: "1", left: "-=178", top: "+=220", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard4").delay(n+300).animate({opacity: "1", left: "-=148", top: "+=230", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer7(n) {

	$(document).ready(function(){
		$("#dealoutcard1").delay(n).animate({opacity: "1", left: "+=239", top: "-=21", height: "-=28", width: "-=21"}, 1000);		
		$("#dealoutcard2").delay(n+300).animate({opacity: "1", left: "+=210", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer7(n) {

	$(document).ready(function(){
		$("#dealoutcard1").delay(n).animate({opacity: "1", left: "-=239", top: "+=21", height: "+=28", width: "+=21"}, 1000);		
		$("#dealoutcard2").delay(n+300).animate({opacity: "1", left: "-=210", top: "+=30", height: "+=28", width: "+=21"}, 1000);
		
	});
}

function dealCardsToPlayer8(n) {

	$(document).ready(function(){
		$("#dealoutcard15").delay(n).animate({opacity: "1", left: "+=178", top: "+=180", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard16").delay(n+300).animate({opacity: "1", left: "+=148", top: "+=171", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function unDealCardsToPlayer8(n) {

	$(document).ready(function(){
		$("#dealoutcard15").delay(n).animate({opacity: "1", left: "-=178", top: "-=180", height: "+=28", width: "+=21"}, 1000);
		$("#dealoutcard16").delay(n+300).animate({opacity: "1", left: "-=148", top: "-=171", height: "+=28", width: "+=21"}, 1000);
		
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
			.children(".playerdisplayimage")
				.attr("src","images/display" + choice + ".png");
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
	var playernumber = prompt("Please enter number of players","1-8");
	//if (playernumber!=null && playernumber!="" && playernumber!="1-8") {
	return playernumber;
	//}
}

$(document).ready(function(){

	$("#newgamebutton").click(function(){

		dealCards(8);
		unDealCards(8);
		changeDisplay(1,"Idle");
		changeDisplay(2,"Idle");
		changeDisplay(3,"Idle");
		changeDisplay(4,"Idle");
		changeDisplay(5,"Idle");
		changeDisplay(6,"Idle");
		changeDisplay(7,"Idle");
		changeDisplay(8,"Idle");
		var players = showPlayerNumberDialog();
		hidePlayers(8-players);
		dealCards(parseInt(players));
		//unDealCardsToPlayer7(8);
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
		ourDisplayToFold();
	});
	
	$("#buttoncall").click(function(){
		ourDisplayToCall();
	});
	
	$("#buttonraise").click(function(){
		ourDisplayToRaise();
	});
	
});