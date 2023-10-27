const side = 15;
let cellNum = 40;
const Socket = io();
let seasons = 0;

const pauseBtn = document.querySelector('#pause');
const resumeBtm = document.querySelector('#resume');
const restartBtn = document.querySelector('#restart');

pauseBtn.addEventListener('click', handlePauseGame);
resumeBtm.addEventListener('click', handleResumeGame);
restartBtn.addEventListener('click', handleRestartGame);

let ifPaused = false;

function handlePauseGame() {
    ifPaused = true
    Socket.emit('pause game', ifPaused);
}

function handleResumeGame() {
    ifPaused = false
    Socket.emit('pause game', ifPaused);
}

function handleRestartGame() {
    Socket.emit('restart game');
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
                if (seasons == 1) {
                    console.log(seasons);
                    fill("white");
                }
                 else if (seasons == 2) {
                     fill("pink");
                 }
                 else if (seasons == 3) {
                     fill("green");
                 }
                 else if (seasons == 4) {
                     fill("brown");
                }
            }
            else if (matrix[y][x] == 4) {
                fill("black");
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
                fill("blue");
            }
            else if (matrix[y][x] == 6) {
                fill("orange");
            }
            rect(x * side, y * side, side, side);

        }
    }
}

Socket.on("draw matrix", drawMatrix);

Socket.on("change statistic", handleAddStatistic);
const grass = document.querySelector('#grass');
const grassEater = document.querySelector('#grassEater');
const evertEater = document.querySelector('#everyEater');
const redEater = document.querySelector('#redEater');
const fish = document.querySelector('#fish');

function handleAddStatistic(obj) {
    grass.innerText = "New grass: " + obj.grass;
    grassEater.innerText = "New grassEater: " + obj.grassEater;
    allEater.innerText = "New everyEater: " + obj.everyEater;
    redEater.innerText = "New redEater: " + obj.redEater;
    fish.innerText = "New fish: " + obj.fish;
}

const sesonsBtn = document.querySelector('#seasons');
sesonsBtn.addEventListener('click', handleChangeSeason);


function handleChangeSeason() {
    console.log('clicked');
    
    if (seasons < 4) {
        seasons++;
    } else {
        seasons = 1;
    }
    
    Socket.emit("change season", seasons);
    if (seasons == 1) {
        sesonsBtn.textContent = 'Winter';
    } else if (seasons == 2) {
        sesonsBtn.textContent = 'Spring';
    } else if (seasons == 3) {
        sesonsBtn.textContent = 'Summer';
    } else if (seasons == 4) {
        sesonsBtn.textContent = 'Autumn';
    }
}