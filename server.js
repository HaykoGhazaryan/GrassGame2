const express = require("express");
const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);
module.exports = io;

app.use(express.static("."));

app.get('/', (req, res) => {
    res.redirect('index.html');
})

matrix = [];
cellNum = 40;

statisticObj = {
    grass: 0,
    grassEater: 0,
    everyEater: 0,
    redEater: 0,
    fish: 0
}

let Grass = require('./grass.js');
let GrassEater = require('./grassEater.js');
let EveryEater = require('./classAllEater.js');
let Water = require('./water.js');
let RedEater = require('./redEater.js');
let Fish = require('./fish.js')

function fillMatrix(cellNum, grassNum, grassEaterNum, redEaterNum, allEaterNum, waterNum, fishNum) {
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
    fillRandomCells(6, fishNum);
    return matrix;
}


function initGame() {
    matrix = fillMatrix(cellNum, 40, 8, 8, 8, 50, 8);
    
    initArrays();
    startInterval();
}

function initArrays() {

    grassArr = [];
    redEaterArr = [];
    grassEaterArr = [];
    everyEaterArr = [];
    waterArr = [];
    fishArr = [];

    for (let y = 0; y < cellNum; y++) {
        for (let x = 0; x < cellNum; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                let everyEater = new EveryEater(x, y);
                everyEaterArr.push(everyEater);
            }
            else if (matrix[y][x] == 4) {
                let redEater = new RedEater(x, y);
                redEaterArr.push(redEater);

            }
            else if (matrix[y][x] == 6) {
                let fish = new Fish(x, y);
                fishArr.push(fish);
            }

        }
    }
}

fillMatrix(cellNum);
let speed = 300;
let intId;

function startInterval() {
    clearInterval(intId)
    intId = setInterval(function () {
        playGame();
    }, speed)
}

function playGame() {
    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        const eater = grassEaterArr[i];
        eater.eat();
    }
    for (let i = 0; i < everyEaterArr.length; i++) {
        const everyEater = everyEaterArr[i];
        everyEater.eat();
    }
    for (let i = 0; i < redEaterArr.length; i++) {
        const redEater = redEaterArr[i];
        redEater.eat();
    }
    for (let i = 0; i < fishArr.length; i++) {
        const fish = fishArr[i];
        fish.eat();
    }
    io.emit('draw matrix', matrix);
}

io.on("connection", function (socket) {
    socket.emit('draw matrix', matrix);
    initGame();
    socket.on('pause game', handlePauseGame);
    socket.on('restart game', handleRestartGame);
    socket.on('change seasons', handleChangeSeason);
})

function handleChangeSeason() {
    if (seasons == 1) {
        speed = 1000;
    } else if (seasons == 2 || seasons == 4) {
        speed = 700;
    } else {
        speed = 300;
    }
    startInterval();
}

function handlePauseGame(ifPaused) {
    if (ifPaused) {
        clearInterval(intId);
    } else {
        startInterval();
    }
}

function handleRestartGame() {
    clearInterval();
    initGame();
}

server.listen(3005, function () {

    console.log("Example is running on port 3005");

});