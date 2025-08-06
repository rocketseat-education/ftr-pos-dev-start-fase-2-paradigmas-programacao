const prompt = require("prompt-sync")(); // !!! Requires Node.js to run !!!
const Hero = require("./hero.js");
const Monster = require("./monster.js");

console.log("You wake up in a cold and damp dungeon...");
heroName = prompt("What is your hero name? ");

const player = new Hero(heroName);

//Main game loop
while (player.getHp() > 0) {
    const choice = showMenu();

    switch (choice) {
        case "1":
            explore(player);
            break;
        case "2":
            player.usePotion();
            break;
        case "3":
            console.log("You give up on your adventure. Game over.");
            break;
        default:
            console.log("Invalid option!");
    }

    if(choice === "3") break;
}

// Functions declarations

function showMenu() {
    console.log("\nWhat do you do?");
    console.log("1. Explore the next room");
    console.log("2. Drink a healing potion (+5 HP)");
    console.log("3. Give up");
    return prompt(">> ");
}

function calculateDamage(strength){
    const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
    const damage = strength + variation;
    
    return damage > 0 ? damage : 1;
}

function explore(){
    console.log(`\n${player.name} a door and enter a new room...`);

    if (Math.random() < 0.5) {
        battle(player);
    } else {
        console.log("The room is empty. You find a potion!");
        player.addPotion();
    }
}

function battle(){
    const monster = new Monster("Goblin");
    console.log(`Suddenly, a ${monster.type} jumps out of the shadows!`);

    while(player.getHp() > 0 && monster.getHp() > 0) {
        player.showStatus();
        console.log(`Monster Status -> HP: ${monster.getHp()}`);

        //Player's turn
        console.log("Your turn 1. Normal Attack 2. Furious Attack (2 hits)");
        const attack = prompt(">> ");

        if (attack === "2") {
            console.log("You use Furious Attack!");
            for (let i = 0; i < 2; i++) {
                if (monster.getHp() > 0) {
                    const heroDamage = calculateDamage(3);
                    monster.takeDamage(heroDamage);
                    console.log(`Hit ${i + 1}: You deal ${heroDamage} damage!`);
                }
            }
        } else {
            const heroDamage = calculateDamage(5);
            monster.takeDamage(heroDamage);
            console.log(`You attack and deal ${heroDamage} damage!`);
        }

        //Monster's turn
        if (monster.getHp() > 0) {
            const monsterDamage = calculateDamage(monsterStrength);
            heroHp -= monsterDamage;
            console.log(`The ${monster.getType()} strikes back and deals ${monsterDamage} damage!`);
        }

        //Battle outcome
        if (player.getHp() > 0) {
            console.log(`You defeated the ${monster.getType()}!`);
            player.incrementMonstesDefeated();
        }else{
            console.log("You were defeated... Your journey ends here.");
        }
        player.showStatus()
    }
}
