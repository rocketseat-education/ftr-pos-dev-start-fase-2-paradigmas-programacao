class Monster {
    constructor(type) {
        this.type = type;
        this._hp = 30;
        this.strength = 5;
    }

    getHp(){
        return this._hp;
    }

    getType(){
        return this.type;
    }

    getStrength(){
        return this._strength;
    }

    takeDamage(amount) {
        this._hp -= amount;
        if (this._hp < 0) {
            this._hp = 0;
        }
    }

    attack(target){
        console.log(
            `${this.getType()} attacks ${target.getName()} for
${this.getStrength()} damage!`,
        );
        target.takeDamage(this.getStrength());
    }
}

module.exports = Monster;