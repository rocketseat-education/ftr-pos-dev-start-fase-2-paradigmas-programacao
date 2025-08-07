class Character {
    constructor(name, hp, strength) {
        this.name = name;
        this._hp = hp;
        this._strength = strength;
    }

    getName(){
        return this.name;
    }

    getHp(){
        return this._hp;
    }

    getStrength(){
        return this._strength;
    }

    takeDamage(amount){
        this._hp -= amount;
        if (this._hp < 0) {
            this._hp = 0;
        }
    }

    attack(target){
        console.log(`${this.getName()} attacks ${target.getName()}`);
        target.takeDamage(0);
    }
}

module.exports = Character;