let Creature = require('./creature');
const io = require('./server');

module.exports = class Fish extends Creature {
    mul() {
        let exact = this.selectRandomCell(0);

        if (exact && this.energy > 10) {

            statisticObj.fish++;
            io.emit('change statistic', statisticObj);

            let x = exact[0];
            let y = exact[1];

            let fish = new Fish(x, y);
            matrix[y][x] = 6;
            fishArr.push(fish);

            this.energy = 10;
        }

    }
    eat() {
        let exact = this.selectRandomCell(5);

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < waterArr.length; i++) {
                if (waterArr[i].x == x && waterArr[i].y == y) {
                    waterArr.splice(i, 5)
                }
            }

            matrix[y][x] = 6
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
        for (let i = 0; i < fishArr.length; i++) {
            if (fishArr[i].x == this.x && fishArr[i].y == this.y) {
                fishArr.splice(i, 6)
            }
        }
        matrix[this.y][this.x] = 0
    }
}