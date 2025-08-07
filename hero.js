const Character = require("./character.js");

class Hero extends Character{
    constructor(name) {
        super(50);
        this.name = name;
        this._hp = 50;
        this._potions = 3;
        this.monstersDefeated = 0;
    }

    getName() {
        return this.name;
    }

    getMonstersDefeated() {
        return this._monstersDefeated;
    }

    showStatus() {
        console.log("\n--- STATUS ---");
        console.log(
            `Hero: ${this.name} | HP: ${this._hp} | Potions: ${this._potions}`,
        );
        console.log(`Monsters Defeated: ${this.getMonstersDefeated()}`);
        console.log("----------------");
    }

    usePotion() {
        if (this._potions > 0) {
            this._potions--;
            this._hp += 20;
            console.log(`${this.name} used a potion and healed 20 HP.`);
        } else {
            console.log("You have no more potions!");
        }

    }

    addPotion() {
        this._potions++;
    }

    incrementMonstesDefeated() {
        this._monstersDefeated++;
    }

}

module.exports = Hero;