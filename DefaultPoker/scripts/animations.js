/**
 * 
 */

$(document).ready(function(){

	$("#newgamebutton").click(function(){
	  
		$("#dealoutcard1").animate({opacity: "1", left: "+=239", top: "-=21", height: "-=28", width: "-=21"}, 1000).delay(1000);		
		$("#dealoutcard2").animate({opacity: "1", left: "+=210", top: "-=30", height: "-=28", width: "-=21"}, 1000).delay(1000);
		
		
		//$("#dealoutcard").animate({opacity: "1", left: "+=110", top: "-=30", height: "-=28", width: "-=21"}, 1000);
		
		//$("#tablecard5").animate({ right: "+=100" }, 1000);
	  
		return false;
	
	});
	
});