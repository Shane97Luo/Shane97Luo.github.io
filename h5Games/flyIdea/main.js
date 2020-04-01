/** 主要由以下几个模块
 * 1 通用模块，包括选择，变形，尺子，几何图形
 * 2 工具模块，提供几种笔，橡皮擦，等工具
 * 3 图层模块，管理图层，增删，背景色等 
 * 4 色盘模块，颜色选择，最好能提供同胞色，使用颜色保存等
 * 5 文件模块，保存新建文件，撤销，恢复动作。
 */



let isDown = false;
let points = []; //获取点
let beginPoint = null; //起点
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function setLine(params) {
    this.strokeStyle = 'red';
    this.lineWidth = 1;
    this.lineJoin = 'round';
    this.lineCap = 'round';

}

// 设置线条颜色
ctx.strokeStyle = 'red';
ctx.lineWidth = 2;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

canvas.addEventListener('mousedown', down, false);
canvas.addEventListener('mousemove', move, false);
canvas.addEventListener('mouseup', up, false);
canvas.addEventListener('mouseout', up, false);

window.addEventListener('resize', onResize, false);

function onResize() {

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.putImageData(imgData, 0, 0);

    // 设置线条颜色
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
}

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

// var cvs = document.getElementById("canvas");
// // cvs.width = window.innerWidth;
// // cvs.hight = window.innerHeight;

// ctext = cvs.getContext('2d');
// ctext.strokeStyle = 'red';
// ctext.lineWidth = 5;
// ctext.lineJoin = 'round';
// ctext.lineCap = 'round';

// ctext.moveTo(40, 40);
// ctext.lineTo(200, 100);
// ctext.stroke();

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