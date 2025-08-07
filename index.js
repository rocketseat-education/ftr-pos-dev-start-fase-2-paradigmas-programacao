const prompt = require("prompt-sync")(); // !!! Requires Node.js to run !!!
const Hero = require("./hero.js");
const Monster = require("./monster.js");
const Mage = require("./mage.js");
const Warrior = require("./warrior.js");

function hordeBattle(player) {
    const horde = [
        new Monster("Goblin 1", 25, 5),
        new Monster("Goblin 2", 15, 7),
        new Monster("Goblin 3", 20, 6),
    ];

    const totalHordeHp = horde.reduce((sum, monster) => sum + monster.getHp(), 0);
    console.log(`\nA fearsome horde appears! Their combined health is ${totalHordeHp} HP.`);

    while (player.getHp() > 0) {
        const livingMonsters = horde.filter((monster) => monster.getHp() > 0);

        if (livingMonsters.length === 0) {
            break;
        }

        player.showStatus();

        const monsterStatusList = livingMonsters.map((monster, index) => {
            return `${index + 1}. ${monster.getName()} (HP: ${monster.getHp()})`
        });

        console.log("\n--- Horde Status ---\n" + monsterStatusList.join("\n"));

        const targetChoice = prompt("Choose your target (1, 2, etc.) >>");
        const targetIndex = Number(targetChoice) - 1;

        if (targetIndex >= 0 && targetIndex < livingMonsters.length) {
            const target = livingMonsters[targetIndex];
            player.attack(target);
            if (target.getHp() <= 0 && !target.isDefeated) {
                console.log(`The ${target.getName()} has been slain!`);
                player.incrementMonstesDefeated();
                target.isDefeated = true;
            }
        } else {
            console.log("Invalid target. You hesitated and missed your turn!");
        }

        const survivingMonsters = horde.filter((monster) => monster.getHp() > 0);
        if (survivingMonsters.length > 0) {
            console.log("\nThe horde strikes back!");
            for (const monster of survivingMonsters) {
                monster.attack(player);
                if (player.getHp() === 0) break;
            }
        }

        if (player.getHp() > 0) {
            console.log("\nVictory! You defeated the entire horde!");
        }
    }

}


function explore(player) {
    console.log("You explore the next room...");

    if (Math.random() < 0.5) {
        battle(player);
    } else {
        console.log("The room is empty, you find a potion!");
        if (player instanceof Warrior) {
            player.addStaminaPotion();
        } else if (player instanceof Mage) {
            player.addManaPotion();
        } else {
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
                if (potionType === "1") player.useHpPotion();
                else if (potionType === "2") player.useStaminaPotion();
                else console.log("Invalid potion choice.");
            } else if (player instanceof Mage) {
                potionType = prompt("Use which potion? (1) HP or (2) Mana >>");
                if (potionType === "1") player.useHpPotion();
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

    if (choice === "3") break;
}

if (player.getHp() <= 0) {
    console.log("\nYou have been defeated...");
}

player.showStatus();
