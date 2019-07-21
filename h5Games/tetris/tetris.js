
/*******************************************
*
*******************************************/

var canvas = document.getElementById("tetris");
var ctx = canvas.getContext("2d");

xPos = 10;
yPos = 10;
width = 20;
height = 20;

function draw() {
    ctx.fillRect(xPos, yPos, width, height);    
}
