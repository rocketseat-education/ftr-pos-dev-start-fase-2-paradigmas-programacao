const Character = require("./character.js");

class Hero extends Character {
    constructor(name, hp, strength) {
        super(name, hp, strength);
        this._HpPotions = 3;
        this.monstersDefeated = 0;
    }

    showStatus() {
        console.log("\n--- STATUS ---");
        console.log(
            `Hero: ${this.getName()} | HP: ${this.getHp()} | Potions: ${this.getHpPotions()}`,
        );
        console.log(`Monsters Defeated: ${this.getMonstersDefeated()}`);
        console.log("----------------");
    }

    useHpPotion() {
        if (this._potions > 0) {
            this._hpPotions--;
            this._hp += 20;
            console.log(`${this.getName()} used a potion and healed 20 HP.`);
        } else {
            console.log("You have no more potions!");
        }

    }

    getHpPotions() {
        return this._HpPotions;
    }

    addHpPotion() {
        this._hpPotions++;
    }

    getMonstersDefeated() {
        return this._monstersDefeated;
    }

    incrementMonstesDefeated() {
        this._monstersDefeated++;
    }

}

module.exports = Hero;