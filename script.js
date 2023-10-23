const side = 15;
let cellNum = 40;
const Socket = io()

const pauseBtn = document.querySelector('#pause')
const resumeBtm = document.querySelector('#resume')
const restartBtn = document.querySelector('#restart')

pauseBtn.addEventListener('click', handlePauseGame)
resumeBtm.addEventListener('click', handleResumeGame)
restartBtn.addEventListener('click', handleRestartGame)

let ifPaused = false;

function handlePauseGame() {
    ifPaused = true
    socket.emit('pause game', ifPaused)
}

function handleResumeGame() {
    ifPaused = false
    socket.emit('pause game', ifPaused)
}

function handleRestartGame() {
    socket.emit('restart game')
}

function setup() {
    frameRate(8);
    createCanvas(side * cellNum, side * cellNum);
    background('#acacac');
}

function drawMatrix(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 4) {
                fill("black")
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] = 5) {
                fill("blue")
            }
            rect(x * side, y * side, side, side);

        }
    }
}

Socket.on("draw matrix", drawMatrix);