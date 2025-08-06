const prompt = require("prompt-sync")(); // !!! Requires Node.js to run !!!

// Variable declarations
let heroName;
let heroHp = 10;
let heroPotions = 2;
let monstersDefeated = 0;

// Initial message and input
console.log("You wake up in a cold and damp dungeon...");
heroName = prompt("What is your hero name? ");

//Main game loop
while (heroHp > 0) {
    showStatus(heroName, heroHp, heroPotions, monstersDefeated);

    const choice = showMenu();

    switch (choice) {
        case "1":
            explore();
            break;
        case "2":
            usePotion();
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
function showStatus(name, hp, options, monsters){
    console.log("\n--- STATUS ---");
    console.log(
        `Hero: ${name} | HP: ${hp} | Potions: ${potions} | Monsters Defeated:
        ${monsters}`,
    );
    console.log("----------------");
}

function showMenu() {
    console.log("\nWhat do you do?");
    console.log("1. Explore the next room");
    console.log("2. Drink a healing potion (+5 HP)");
    console.log("3. Give up");
    return prompt(">> ");
}

function usePotion() {
    if (heroPotions > 0) {
        console.log("You drink a healing potion and recover 5 HP.");
        heroHp += 5;
        heroPotions--;
    } else {
        console.log("You have no more potions!");
    }
}

function explore(){
    console.log("\nYou open a door and enter a new room...");

    if (Math.random() < 0.5) {
        console.log("Suddenly, a Goblin jumps out of the shadows!");
        battle();
    } else {
        console.log("The room is empty. You find a potion!");
        heroPotions++;
    }
}