/**
 * 
 */

$(document).ready(function(){

	$("#newgamebutton").click(function(){
		
		jQnotice("Your notification");
		
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
		$("#dealoutcard20").delay(6100).animate({ left: "-=300" }, 1000);
	  
		return false;
	
	});
	
	$("#exitbutton").click(function(){
		if (confirm("Getting a life?"))
		{
			window.close();
		}
	});
	
	$("#buttonfold").click(function(){
		$("#ourdisplayimage").fadeTo(400,0.0, function(){
				$("#ourdisplayimage").attr("src","images/displayFold.png");
				});
		$("#ourdisplayimage").fadeTo(500,100.0);
		return false;
	});
	
	$("#buttoncall").click(function(){
		$("#ourdisplayimage").fadeTo(400,0.0, function(){
			$("#ourdisplayimage").attr("src","images/displayCall.png");
		});
		$("#ourdisplayimage").fadeTo(500,100.0);
		return false;
	});
	
	$("#buttonraise").click(function(){
		$("#ourdisplayimage").fadeTo(400,0.0, function(){
			$("#ourdisplayimage").attr("src","images/displayRaise.png");
		});
		$("#ourdisplayimage").fadeTo(500,100.0);
		return false;
	});
	
});