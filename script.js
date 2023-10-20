const side = 50;
let cellNum = 40;
const Socket = io()

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