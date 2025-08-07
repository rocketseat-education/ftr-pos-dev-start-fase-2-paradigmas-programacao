const Character = require("./character");

class Monster extends Character{
    constructor(type, hp, strength) {
        super(type, hp, strength);
        this.isDefeated = false;
    }
}

module.exports = Monster;