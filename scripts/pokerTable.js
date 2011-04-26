function draw() {
	var canvas = document.getElementById("pokerTable");

	var raam = canvas.getContext("2d");
	raam.fillStyle = "#61380B";
	raam.beginPath();
	raam.moveTo(160, 0);
	raam.lineTo(440, 0);
	raam.bezierCurveTo(650, 0, 650, 300, 440, 300);
	raam.lineTo(160, 300);
	raam.bezierCurveTo(-50, 300, -50, 0, 160, 0);
	raam.closePath();
	raam.fill();

	var raami_efekt = canvas.getContext("2d");
	raami_efekt.beginPath();
	raami_efekt.moveTo(160, 0);
	raami_efekt.lineTo(440, 0);
	raami_efekt.bezierCurveTo(650, 0, 650, 300, 440, 300);
	raami_efekt.lineTo(160, 300);
	raami_efekt.bezierCurveTo(-50, 300, -50, 0, 160, 0);
	raami_efekt.closePath();
	raami_efekt.lineWidth = 1;
	var grdRaam1 = raami_efekt.createLinearGradient(300, 0, 300, 300);
	grdRaam1.addColorStop(0, "#3B240B");
	grdRaam1.addColorStop(1, "#000000");
	raami_efekt.strokeStyle = grdRaam1;
	raami_efekt.stroke();

	var raami_efekt2 = canvas.getContext("2d");
	raami_efekt2.beginPath();
	raami_efekt2.moveTo(160, 5);
	raami_efekt2.lineTo(440, 5);
	raami_efekt2.bezierCurveTo(642, 5, 642, 295, 440, 295);
	raami_efekt2.lineTo(160, 295);
	raami_efekt2.bezierCurveTo(-42, 295, -42, 5, 160, 5);
	raami_efekt2.closePath();
	raami_efekt2.lineWidth = 1;
	var grdRaam2 = raami_efekt2.createLinearGradient(300, 0, 300, 300);
	grdRaam2.addColorStop(0, "#000000");
	grdRaam2.addColorStop(1, "#FFFFFF");
	raami_efekt2.strokeStyle = grdRaam2;
	raami_efekt2.stroke();

	var laud = canvas.getContext("2d");
	var grd = laud.createLinearGradient(300, 300, 300, 0);
	grd.addColorStop(0, "#0A2A0A");
	grd.addColorStop(1, "#0B610B");
	laud.fillStyle = grd;
	laud.beginPath();
	laud.moveTo(160, 5);
	laud.lineTo(440, 5);
	laud.bezierCurveTo(642, 5, 642, 295, 440, 295);
	laud.lineTo(160, 295);
	laud.bezierCurveTo(-42, 295, -42, 5, 160, 5);
	laud.closePath();
	laud.fill();

	var joon = canvas.getContext("2d");
	joon.beginPath();
	joon.moveTo(160, 70);
	joon.lineTo(440, 70);
	joon.bezierCurveTo(550, 70, 550, 230, 440, 230);
	joon.lineTo(160, 230);
	joon.bezierCurveTo(50, 230, 50, 70, 160, 70);
	joon.closePath();
	joon.lineWidth = 5;
	joon.strokeStyle = "rgba(255,255,255,0.2)";
	joon.stroke();
}