const express = require("express");
const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', (req, res) => {
    res.redirect('index.html');
})

grassArr = [];
redEaterArr = [];
grassEaterArr = [];
everyEaterArr = [];
waterArr = [];
matrix = [];
cellNum=40

function fillMatrix(cellNum, grassNum, grassEaterNum, redEaterNum, allEaterNum, waterNum) {
    let matrix = [];
    for (let y = 0; y < cellNum; y++) {
    matrix[y] = [];
    for (let x = 0; x < cellNum; x++) {
    matrix[y][x] = 0;
    }
    }
    function fillRandomCells(value, count) {
    while (count > 0) {
    const col = Math.floor(Math.random() * cellNum);
    const row = Math.floor(Math.random() * cellNum);
    if (matrix[col][row] === 0) {
    matrix[col][row] = value;
    count--;
    }
    }
    }
    
    fillRandomCells(1, grassNum);
    fillRandomCells(2, grassEaterNum);
    fillRandomCells(3, redEaterNum);
    fillRandomCells(4, allEaterNum);
    fillRandomCells(5, waterNum);
    return matrix;
    }

matrix =  fillMatrix(cellNum, 2, 2, 4, 8, 5);
console.log(matrix);

function initGame() {
    
}

io.on("connection", function(socket){
    socket.emit('draw matrix', matrix);
    initGame();
})

app.listen(3000, function () {

    console.log("Example is running on port 3000");

});