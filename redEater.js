let Creature = require('./creature');
module.exports = class RedEater extends Creature {
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let redEater = new RedEater(x, y);
            matrix[y][x] = 4;
            redEaterArr.push(redEater);

            this.energy = 5;
        }

    }
    eat() {
        let found = this.chooseCell(3);
        let exact = random(found)

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < redEaterArr.length; i++) {
                if (redEaterArr[i].x == x && redEaterArr[i].y == y) {
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
        let found = this.chooseCell(0);
        let exact = random(found)

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