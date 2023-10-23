let Creature = require('./creature');
module.exports = class RedEater extends Creature {
    mul() {
        let exact = this.selectRandomCell(0);

        if (exact && this.energy > 10) {
            let x = exact[0];
            let y = exact[1];

            let eater = new RedEater(x, y);
            matrix[y][x] = 4;
            grassEaterArr.push(eater);

            this.energy = 10;
        }
    }
    eat() {
        let exact = this.selectRandomCell(3);

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < everyEaterArr.length; i++) {
                if (everyEaterArr[i].x == x && everyEaterArr[i].y == y) {
                    everyEaterArr.splice(i, 3)
                }
            }

            matrix[y][x] = 4
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

            matrix[y][x] = 4
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
        for (let i = 0; i < redEaterArr.length; i++) {
            if (redEaterArr[i].x == this.x && redEaterArr[i].y == this.y) {
                redEaterArr.splice(i, 4)
            }
        }
        matrix[this.y][this.x] = 0
    }
}