const prompt = require("prompt-sync")(); // !!! Requires Node.js to run !!!
const Hero = require("./hero.js");
const Monster = require("./monster.js");
const Mage = require("./mage.js");
const Warrior = require("./warrior.js");

function calculateDamage(strength){
    return Math.floor(Math.random() * 3) - 1;
}

function battle(player){
    const monster = new Monster("Goblin");
    console.log(`\nA wild ${monster.getName()} appears!`);

    while(player.getHp() > 0 && monster.getHp() > 0) {
        player.showStatus();
        console.log(`Monster Status -> HP: ${monster.getHp()}`);

        console.log("Your turn 1. Normal Attack 2. Furious Attack (2 hits)");
        const attackChoice = prompt(">> ");

        if (attackChoice === "2") {
            console.log("You use Furious Attack!");
            player.attack(monster);
            if (monster.getHp() > 0) {
                player.attack(monster);
            }
        } else {
            player.attack(monster);
        }

        if (monster.getHp() > 0) {
            const monsterDamage = calculateDamage(monster.getStrength());
            console.log(`The ${monster.getName()} strikes back and deals ${monsterDamage} damage!`);
            player.takeDamage(monsterDamage);
        }

        if (player.getHp() > 0) {
            console.log(`You defeated the ${monster.getName()}!`);
            player.incrementMonstesDefeated();
        }else{
            console.log("You were defeated... Your journey ends here.");
        }
        player.showStatus()
    }
}

function explore(player){
    console.log("You explore the next room...");

    if (Math.random() < 0.5) {
        battle(player);
    } else {
        console.log("The room is empty, you find a potion!");
        if (player instanceof Warrior) {
            player.addStaminaPotion();
        } else if (player instanceof Mage){
            player.addManaPotion();
        }else{
            player.addHpPotion();
        }
    }
}

function showMenu(player) {
    player.showStatus();
    console.log("\nWhat do you do?");
    console.log("1. Explore the next room");
    console.log("2. Drink a healing potion (+5 HP)");
    console.log("3. Give up");
    return prompt(">> ");
}

console.log("You wake up in a cold and damp dungeon...");
const heroName = prompt("what is your hero's name?");

const classChoice = prompt("Choose your class (1) Warrior (2) Mage >> ");
let player;

if (classChoice === "1") {
    player = new Warrior(heroName);
} else {
    player = new Mage(heroName);
}

console.log(`\n${player.getName()}, the ${player.getName()}, your adventure begins!`);

//Main game loop
while (player.getHp() > 0) {
    const choice = showMenu(player);

    switch (choice) {
        case "1":
            explore(player);
            break;
        case "2":
            let potionType;
            if (player instanceof Warrior) {
                potionType = prompt("Use which potion? (1) HP or (2) Stamina >>");
                if(potionType === "1") player.useHpPotion();
                else if (potionType === "2") player.useStaminaPotion();
                else console.log("Invalid potion choice.");
            } else if (player instanceof Mage){
                potionType = prompt("Use which potion? (1) HP or (2) Mana >>");
                if(potionType === "1") player.useHpPotion();
                else if (potionType === "2") player.useManaPotion();
                else console.log("Invalid potion choice.");
            }
            break;
        case "3":
            console.log("You give up on your adventure. Game over.");
            break;
        default:
            console.log("Invalid option!");
    }

    if(choice === "3") break;
}

if (player.getHp() <= 0) {
    console.log("\nYou have been defeated...");
}

player.showStatus();
