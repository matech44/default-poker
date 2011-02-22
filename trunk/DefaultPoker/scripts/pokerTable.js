function draw(){
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

var laud = canvas.getContext("2d");
var grd=laud.createLinearGradient(300,300,300,0);
grd.addColorStop(0,"#0A2A0A");
grd.addColorStop(1,"#0B610B");
laud.fillStyle=grd;
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
joon.lineWidth=5;
joon.strokeStyle="rgba(255,255,255,0.2)";
joon.stroke();
}