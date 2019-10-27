function initCanvas() {
    var canvas_maze = document.getElementById('maze');
    canvas_maze.height = 800;
    canvas_maze.width = 500;
}

function initArray(width, height) {
    var mazeArr = new Array(width);
    for (let i = 0; i < width; i++) {
        mazeArr[i] = new Array();
        for (let j = 0; j < height; j++) {
            mazeArr[i][j] = 1;
        }
    }
    return mazeArr;
}

var mazeArr = initArray(4, 4);
console.log(mazeArr);

/**
 * @brief draw maze map
 * @param   width   - map width
 *          height  - height
 *          len     - undefined
 */
function drawMaze(width, height, len) {
    var canvas_maze = document.getElementById('maze');
    var ctx_maze = canvas_maze.getContext('2d');
    ctx_maze.fillStyle = "#FF0000";
    ctx_maze.fillRect(0, 0, 150, 75);

    drawSquare(5, 5, 20, 20);
}

function drawSquare(posX, posY, width, height) {
    var canvas_maze = document.getElementById('maze');
    var ctx_maze = canvas_maze.getContext('2d');
    ctx_maze.fillStyle = "#FF0000";
    ctx_maze.fillRect(posX * width, posY * height, posX * width + width, posY * height + height);
}


drawMaze(1, 1, 1);