const side = 50;

function setup() {

    function matrixGenerator(matrixSize, grassCount, grassEaterCount, everyEaterCount, redEaterCount, waterCount) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = []
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grassCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 1;
        }
        for (let i = 0; i < grassEaterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 2;
        }
        for (let i = 0; i < everyEaterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 3;
        }
        for (let i = 0; i < redEaterCount; i++) {
            let x = Math.floor(random(matrixSize))
            let y = Math.floor(random(matrixSize))
            matrix[y][x] = 4;
        }
        for (let i = 0; i < waterCount; i++) {
            let x = Math.floor(random(matrixSize))
            let y = Math.floor(random(matrixSize))
            matrix[y][x] = 5;
        }

    }
    matrixGenerator(40, 40, 2, 2, 4, 8)

    frameRate(8);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

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

        }
    }
}

function draw() {

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
            else if (matrix[y][x] == 4) {
                fill("blue")
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
        redEater.move()
    }


}