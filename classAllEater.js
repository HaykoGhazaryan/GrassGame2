let Creature = require('./creature');
const io = require('./server');

module.exports = class EveryEater extends Creature {
    mul() {
        let exact = this.selectRandomCell(0);

        if (exact && this.energy > 8) {

            statisticObj.everyEater++;
            io.emit('change statistic', statisticObj);

            let x = exact[0];
            let y = exact[1];

            let eater = new EveryEater(x, y);
            matrix[y][x] = 3;
            everyEaterArr.push(eater);

            this.energy = 5;
        }

    }
    eat() {
        let exact1 = this.selectRandomCell(1);
        let exact2 = this.selectRandomCell(2);

        if (exact2) {
            this.energy += 4;
            let x = exact2[0];
            let y = exact2[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 100) {
                this.mul()
            }
        }
        else if (exact1) {
            this.energy += 5;
            let x = exact1[0];
            let y = exact1[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 100) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    move() {
        let exact = this.selectRandomCell(0);

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }

}