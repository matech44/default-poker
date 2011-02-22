/**
 * Script handling pop-up of game window
 */

/**
 * Script handling pop-up
 */

function popUp(URL) {
	day = new Date();
	id = day.getTime();
	eval("page"
			+ id
			+ " = window.open(URL, '"
			+ id
			+ "', 'toolbar=0,scrollbars=0,location=0,statusbar=1,menubar=1,resizable=0,width=1050,height=650,left = 158,top = 59');");
}