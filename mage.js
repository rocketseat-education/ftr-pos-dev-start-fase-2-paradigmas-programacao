const Hero = require("./hero.js");

class Mage extends Hero{
    constructor(name) {
        super(name, 80, 5);
        this._mana = 100;
        this._manaPotions = 1;
    }

    getMana(){
        return this._mana;
    }

    getManaPotions(){
        return this._manaPotions;
    }

    addManaPotion(){
        this._manaPotions++;
        console.log(`${this.getName()} found a Mana Potion!`);
    }

    useManaPotion(){
        if (this._manaPotions > 0) {
            this._manaPotions--;
            this._mana += 50;
            console.log(`${this.getName()} used a Mana Potion`);
        } else {
            console.log("No Mana Potions left!");
        }
    }

    attack(target){
        if (this.getMana() >= 20) {
            this.mana -= 20;
            const damage = 25;
            console.log(`${this.getName()} casts a fireball!! (-20 Mana)`);
            target.takeDamage(damage);
        } else {
            console.log(`${this.getName()} is out of mana!`);
        }
    }

    showStatus() {
        console.log(
            `Mage: ${this.getName()} | HP: ${this.getHp()} | Mana: ${this.getMana()}`,
        );
        console.log(`Potions -> HP: ${this.getHpPotions()} | Mana: ${this.getManaPotions()}`);
        console.log(`Monsters Defeated: ${this.getMonstersDefeated()}`);
    }
}

module.exports = Mage;