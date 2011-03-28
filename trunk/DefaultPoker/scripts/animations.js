/**
 * 
 */

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

function dealCards(i) {
	var d = i;
	switch (d){
	case 1:
		$(document).ready(function(){
			dealCardsToPlayer4();
			dealTableCards();
		});
	case 2:
		$(document).ready(function(){
			dealCardsToPlayer3();
			dealCardsToPlayer4();
			dealTableCards();
		});
	case 3:
		$(document).ready(function(){
			dealCardsToPlayer3();
			dealCardsToPlayer4();
			dealCardsToPlayer5();
			dealTableCards();
		});
	case 4:
		$(document).ready(function(){
			dealCardsToPlayer2();
			dealCardsToPlayer3();
			dealCardsToPlayer4();
			dealCardsToPlayer5();
			dealTableCards();
		});
	case 5:
		$(document).ready(function(){
			dealCardsToPlayer1();
			dealCardsToPlayer2();
			dealCardsToPlayer3();
			dealCardsToPlayer4();
			dealCardsToPlayer5();
			dealTableCards();
		});
	case 6:
		$(document).ready(function(){
			dealCardsToPlayer1();
			dealCardsToPlayer2();
			dealCardsToPlayer3();
			dealCardsToPlayer4();
			dealCardsToPlayer5();
			dealCardsToPlayer6();
			dealTableCards();
		});
	case 7:
		$(document).ready(function(){
			dealCardsToPlayer1();
			dealCardsToPlayer2();
			dealCardsToPlayer3();
			dealCardsToPlayer4();
			dealCardsToPlayer5();
			dealCardsToPlayer6();
			dealCardsToPlayer7();
			dealTableCards();
		});
	case 8:
		$(document).ready(function(){
			dealCardsToPlayer1();
			dealCardsToPlayer2();
			dealCardsToPlayer3();
			dealCardsToPlayer4();
			dealCardsToPlayer5();
			dealCardsToPlayer6();
			dealCardsToPlayer7();
			dealCardsToPlayer8();
			dealTableCards();
		});
	}
}

function dealCardsToPlayer1() {
	$(document).ready(function(){
		$("#dealoutcard13").delay(4000).animate({opacity: "1", left: "-=403", top: "+=180", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard14").delay(4300).animate({opacity: "1", left: "-=432", top: "+=171", height: "-=28", width: "-=21"}, 1000);
		
	});
}
function dealCardsToPlayer2() {
	$(document).ready(function(){
		$("#dealoutcard11").delay(3300).animate({opacity: "1", left: "-=475", top: "-=21", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard12").delay(3700).animate({opacity: "1", left: "-=504", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		
	});
}
function dealCardsToPlayer3() {
	$(document).ready(function(){
		$("#dealoutcard9").delay(2700).animate({opacity: "1", left: "-=403", top: "-=220", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard10").delay(3000).animate({opacity: "1", left: "-=433", top: "-=231", height: "-=28", width: "-=21"}, 1000);
		
	});
}
function dealCardsToPlayer4() {
	$(document).ready(function(){
		$("#dealoutcard7").delay(2100).animate({opacity: "1", left: "-=202", top: "-=250", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard8").delay(2400).animate({opacity: "1", left: "-=233", top: "-=262", height: "-=28", width: "-=21"}, 1000);
		
	});
}
function dealCardsToPlayer5() {
	$(document).ready(function(){
		$("#dealoutcard5").delay(1500).animate({opacity: "1", left: "-=3", top: "-=250", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard6").delay(1800).animate({opacity: "1", left: "-=32", top: "-=262", height: "-=28", width: "-=21"}, 1000);
		
	});
}
function dealCardsToPlayer6() {
	$(document).ready(function(){
		$("#dealoutcard3").delay(900).animate({opacity: "1", left: "+=178", top: "-=220", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard4").delay(1200).animate({opacity: "1", left: "+=148", top: "-=230", height: "-=28", width: "-=21"}, 1000);
		
	});
}
function dealCardsToPlayer7() {
	$(document).ready(function(){
		$("#dealoutcard1").animate({opacity: "1", left: "+=239", top: "-=21", height: "-=28", width: "-=21"}, 1000);		
		$("#dealoutcard2").delay(300).animate({opacity: "1", left: "+=210", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		
	});
}
function dealCardsToPlayer8() {
	$(document).ready(function(){
		$("#dealoutcard15").delay(4600).animate({opacity: "1", left: "+=178", top: "+=180", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard16").delay(4900).animate({opacity: "1", left: "+=148", top: "+=171", height: "-=28", width: "-=21"}, 1000);
		
	});
}

function dealTableCards() {
	$(document).ready(function(){
		$("#dealoutcard17").delay(5200).animate({ left: "-=75" }, 1000);
		$("#dealoutcard18").delay(5500).animate({ left: "-=150" }, 1000);
		$("#dealoutcard19").delay(5800).animate({ left: "-=225" }, 1000);
		$("#dealoutcard20").delay(6100).animate({ left: "-=300" }, 1000);
	});
}

$(document).ready(function(){

	$("#newgamebutton").click(function(){
		dealCards(1);
		
		/*
		//Player7
		$("#dealoutcard1").animate({opacity: "1", left: "+=239", top: "-=21", height: "-=28", width: "-=21"}, 1000);		
		$("#dealoutcard2").delay(300).animate({opacity: "1", left: "+=210", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		//Player6
		$("#dealoutcard3").delay(900).animate({opacity: "1", left: "+=178", top: "-=220", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard4").delay(1200).animate({opacity: "1", left: "+=148", top: "-=230", height: "-=28", width: "-=21"}, 1000);
		//Player5
		$("#dealoutcard5").delay(1500).animate({opacity: "1", left: "-=3", top: "-=250", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard6").delay(1800).animate({opacity: "1", left: "-=32", top: "-=262", height: "-=28", width: "-=21"}, 1000);
		//Player4
		$("#dealoutcard7").delay(2100).animate({opacity: "1", left: "-=202", top: "-=250", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard8").delay(2400).animate({opacity: "1", left: "-=233", top: "-=262", height: "-=28", width: "-=21"}, 1000);
		//Player3
		$("#dealoutcard9").delay(2700).animate({opacity: "1", left: "-=403", top: "-=220", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard10").delay(3000).animate({opacity: "1", left: "-=433", top: "-=231", height: "-=28", width: "-=21"}, 1000);
		//Player2
		$("#dealoutcard11").delay(3300).animate({opacity: "1", left: "-=475", top: "-=21", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard12").delay(3700).animate({opacity: "1", left: "-=504", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		//Player1
		$("#dealoutcard13").delay(4000).animate({opacity: "1", left: "-=403", top: "+=180", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard14").delay(4300).animate({opacity: "1", left: "-=432", top: "+=171", height: "-=28", width: "-=21"}, 1000);
		//Player8
		$("#dealoutcard15").delay(4600).animate({opacity: "1", left: "+=178", top: "+=180", height: "-=28", width: "-=21"}, 1000);
		$("#dealoutcard16").delay(4900).animate({opacity: "1", left: "+=148", top: "+=171", height: "-=28", width: "-=21"}, 1000);
		
				
		$("#dealoutcard17").delay(5200).animate({ left: "-=75" }, 1000);
		$("#dealoutcard18").delay(5500).animate({ left: "-=150" }, 1000);
		$("#dealoutcard19").delay(5800).animate({ left: "-=225" }, 1000);
		$("#dealoutcard20").delay(6100).animate({ left: "-=300" }, 1000);*/
	  
		return false;
	
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