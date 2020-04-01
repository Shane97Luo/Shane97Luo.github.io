/**
 * 应用知识点
 * 1:   数组
 * 2:   键盘事件
 * 3:   canvas 基本绘制
 * 4:   dom元素修改
 */

/***************************************************
 * 贪吃蛇小游戏
 * 控制一条蛇，吃得越多，得分升高的同时，速度也会越来越快
 * 生长最大的获胜
 * 
 * ************************************************/

// [1-map]  creat map

// var cavas = document.getElementById("snake");
// cavas.height = window.innerHeight - 200;
// cavas.width = window.innerWidth - 200;

// var initMap = new function() {
//         this.iniCanvas = new function() {
//             var cavas = document.getElementById("snake");
//             cavas.height = window.innerHeight - 200;
//             cavas.width = window.innerWidth - 200;
//         }
//         this.len = 20;
//         this.mapWidth = 200 / this.len;
//         // this.mapHeight = cavas.height / this / len;
//     }
// initMap;

var mapWidth = 24;
var mapHeight = 25;
var map = new Array(mapWidth);

// [!1-map]

// [2-snake]   init snake
// var snake = new Array();

var snake = [
    [3, 1],
    [2, 1],
    [1, 1]
];
var snake2 = [
    [20, 23],
    [21, 23],
    [22, 23]
];
// [!2-snake]

var offset = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0]
};

var status = {
    up: "up",
    down: "down",
    left: "left",
    right: "right"
};

var score = 0; //记录分数

var snakeOffset = offset.right;
var snakeStatus = "right";

//[3 - food]

var food = { x: 10, y: 10, exist: false };

function creatFood() {
    food.x = Math.floor(Math.random() * (mapWidth - 1));
    food.y = Math.floor(Math.random() * (mapHeight - 1));
}

function drawFood(food) {
    ctx.fillStyle = "#FF00ff"; // 颜色
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20); // 形状
}

// [!3 - food]

var cavas = document.getElementById("snake");
var ctx = cavas.getContext('2d');

function crackCheck() {
    var tmp = snake.slice(0, 1)
    tmp[0] = [tmp[0][0] + snakeOffset[0], tmp[0][1] + snakeOffset[1]]


    if (snake.indexOf(tmp[0]) > -1) {
        console.log("crack");
    } else
        console.log("hello");

    // console.log("crack", snake.indexOf(tmp[0]));
    // if (snake.indexOf(tmp, 1) > -1) {}
}

function beginInterface() {
    ctx.fillStyle = "#ffffff"; // 颜色
    ctx.fillRect(0, 0, 480, 500); // 形状
    ctx.fillStyle = "#f00000"; // 颜色
    ctx.font = 'bold 35px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText("exit", 200, 200);
    ctx.strokeText("start", 200, 300);
}

beginInterface();

function drawSnake(snake) {
    ctx.fillStyle = "#FF00ff"; // 颜色

    for (let index = 0; index < snake.length; index++) {
        if (index == 0) {
            ctx.fillStyle = "#FF0000"; // 颜色
            ctx.fillRect((snake[index][0] % 24) * 20, (snake[index][1] % 25) * 20, 20, 20); // 形状
        } else {
            ctx.fillStyle = "#FF00ff"; // 颜色
            ctx.fillRect((snake[index][0] % 24) * 20, (snake[index][1] % 25) * 20, 20, 20); // 形状
        }
    }
}

function draw() {
    // console.log("snake:", snake);
    ctx.clearRect(0, 0, cavas.width, cavas.height); //清除画布
    drawSnake(snake);
    // drawSnake(snake2);

    if (food.exist == false) {
        creatFood();
        food.exist = true;
    }
    drawFood(food);

    //[a]贪吃蛇向前移动
    var tmp = snake.slice(0, 1)
    tmp[0] = [tmp[0][0] + snakeOffset[0], tmp[0][1] + snakeOffset[1]]
    snake.unshift(tmp[0]);
    snake.pop();
    //[a]

    crackCheck();

    if ((snake[0][0] == food.x) && (snake[0][1] == food.y)) {
        snake.push(tmp[0]);
        score++;
        food.exist = false;
    }

    console.log(food.x, food.y, food.exist);
    document.getElementById("record").innerHTML = ["score:" + score];
}

document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];

    console.log(snakeStatus);
    if (e && e.keyCode == 37) { // 按left要做的事情
        if (snakeStatus != "right") {
            snakeOffset = offset.left;
            snakeStatus = "left";
            console.log(snakeStatus);
        }
    }
    if (e && e.keyCode == 38) { // 按 up要做的事情
        if (snakeStatus != "down") {
            snakeOffset = offset.up;
            snakeStatus = "up";
            console.log(snakeStatus);
        }
    }
    if (e && e.keyCode == 39) { // right 键要做的事情
        if (snakeStatus != "left") {
            snakeOffset = offset.right;
            snakeStatus = "right";
            console.log(snakeStatus);
        }
    }
    if (e && e.keyCode == 40) { // down 键要做的事情
        if (snakeStatus != "up") {
            snakeOffset = offset.down;
            snakeStatus = "down";
            console.log(snakeStatus);
        }
    }
    if (e && e.keyCode == 32) { // down 键要做的事情
        alert("暂停");
    }
};

// var ti = setInterval(draw, 200);

var ti = 0;

function run() {
    ti = setInterval(draw, 200);
    // alert(ti);
}

function stop() {
    clearInterval(ti);
    // alert(ti);
}
// test();