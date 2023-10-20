let Creature = require('./creature');
module.exports = class GrassEater extends Creature {
    mul() {
        let exact = this.selectRandomCell(0);

        if (exact && this.energy > 10) {
            let x = exact[0];
            let y = exact[1];

            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);

            this.energy = 10;
        }

    }
    eat() {
        let exact = this.selectRandomCell(1);

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 55) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let exact = this.selectRandomCell(0);

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 2
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