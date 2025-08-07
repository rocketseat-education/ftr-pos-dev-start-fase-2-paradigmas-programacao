class Character {
    constructor(hp) {
        this._hp = hp;
    }

    getHp(){
        return this._hp;
    }

    takeDamage(amount){
        this._hp -= amount;
        if (this._hp < 0) {
            this._hp = 0;
        }
    }
}

module.exports = Character;