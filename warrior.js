const Hero = require("./hero.js");

class Warrior extends Hero {
    constructor(name) {
        super(name, 120, 15);
        this._stamina = 100;
        this._staminaPotions = 1;
    }

    addStaminaPotion(){
        this._staminaPotions++;
        console.log(`${this.name} found a Stamina Potion!`);
    }

    getStamina(){
        return this._stamina;
    }

    getStaminaPotions(){
        return this._staminaPotions;
    }

    useStaminaPotion(){
        if (this._staminaPotions > 0) {
            this._staminaPotions--;
            this._stamina += 50;
            console.log(`${this.getName()} used a Stamina Potion.`);
        } else {
            console.log("No Stamina Potions left.");
        }
    }

    attack(target){
        if (this._stamina >= 10) {
            this._stamina -= 20;
            console.log(`${this.getName()} attacks with a heavy blow! (-10 Stamina)`);
            target.takeDamage(this.getStrength());
        } else {
            console.log(`${this.getName()} is too tired to attack!`);
        }
    }

    showStatus() {
        console.log(
            `Warrior: ${this.getName()} | HP: ${this.getHp()} | Stamina: ${this.getStamina()}`,
        );
        console.log(`Potions -> HP: ${this.getHpPotions()} | Stamina: ${this.getStaminaPotions()}`);
        console.log(`Monsters Defeated: ${this.getMonstersDefeated()}`);
    }
}

module.exports = Warrior;