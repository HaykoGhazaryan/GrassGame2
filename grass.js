let Creature = require('./creature');
module.exports = class Grass extends Creature {

    mul() {
        this.energy++;
        let exact = this.selectRandomCell(0);

        if (exact && this.energy > 0.5) {
            let x = exact[0];
            let y = exact[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 0;
        }
    }
}