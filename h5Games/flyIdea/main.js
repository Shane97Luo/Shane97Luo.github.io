// var param

let isDown = false;
let points = []; //获取点
let beginPoint = null; //起点
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

function setLine(params) {
    this.strokeStyle = 'red';
    this.lineWidth = 1;
    this.lineJoin = 'round';
    this.lineCap = 'round';

}

// 设置线条颜色
ctx.strokeStyle = 'red';
ctx.lineWidth = 1;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

canvas.addEventListener('mousedown', down, false);
canvas.addEventListener('mousemove', move, false);
canvas.addEventListener('mouseup', up, false);
canvas.addEventListener('mouseout', up, false);

function down(evt) {
    isDown = true;
    const {
        x,
        y
    } = getPos(evt);
    points.push({
        x,
        y
    });
    beginPoint = {
        x,
        y
    };
}

function move(evt) {
    if (!isDown) return;

    const {
        x,
        y
    } = getPos(evt);
    points.push({
        x,
        y
    });

    if (points.length > 3) {
        const lastTwoPoints = points.slice(-2);
        const controlPoint = lastTwoPoints[0];
        const endPoint = {
            x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
            y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
        }
        drawLine(beginPoint, controlPoint, endPoint);
        beginPoint = endPoint;
    }
}

function up(evt) {
    if (!isDown) return;
    const {
        x,
        y
    } = getPos(evt);
    points.push({
        x,
        y
    });

    if (points.length > 3) {
        const lastTwoPoints = points.slice(-2);
        const controlPoint = lastTwoPoints[0];
        const endPoint = lastTwoPoints[1];
        drawLine(beginPoint, controlPoint, endPoint);
    }
    beginPoint = null;
    isDown = false;
    points = [];
}

function getPos(evt) {
    return {
        x: evt.offsetX == undefined ? evt.layerX : evt.offsetX,
        y: evt.offsetY == undefined ? evt.layerY : evt.offsetY

        //// 相对于浏览器窗口
        // x: evt.clientX, 
        // y: evt.clientY
    }
}

function drawLine(beginPoint, controlPoint, endPoint) {
    ctx.beginPath();
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
}

var cvs = document.getElementById("canvas");
// cvs.width = window.innerWidth;
// cvs.hight = window.innerHeight;

ctext = cvs.getContext('2d');
ctext.strokeStyle = 'red';
ctext.lineWidth = 5;
ctext.lineJoin = 'round';
ctext.lineCap = 'round';

ctext.moveTo(40, 40);
ctext.lineTo(200, 100);
ctext.stroke();

var id = 3;

// function addCanvas() {

// }
// addCanvas();

// 存储画板 
var canvasLayer = new Array();

/*

function canvasManage() {
    this.currentCanvas =     ;
    
}

*/