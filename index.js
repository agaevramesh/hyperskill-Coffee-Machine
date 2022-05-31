const input = require('sync-input');

const coffeMachine = { water: 400, milk: 540, beans: 120, cups: 9, money: 550 };

const consumables = [{ water: -250, milk: 0, beans: -16, cups: -1, money: 4 },
    { water: -350, milk: -75, beans: -20, cups: -1, money: 7 },
    { water: -200, milk: -100, beans: -12, cups: -1, money: 6 }];

const actionRemaining = () => {
    console.log(`
The coffee machine has:
${coffeMachine["water"]} ml of water
${coffeMachine["milk"]} ml of milk
${coffeMachine["beans"]} g of coffee beans
${coffeMachine["cups"]} disposable cups
$${coffeMachine["money"]} of money`);
};

const actionBuy = () => {
    const inputBuy = input(`\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n`);
    const coffees = [1, 2, 3];
    if (inputBuy === "back") return;
    if (coffees.indexOf(inputBuy) === -1 ) return console.log(`Error input, please try again\n`);
    for (consumable in coffeMachine) {
        if (coffeMachine[consumable] >= Math.abs(consumables[inputBuy - 1][consumable])) coffeMachine[consumable] += consumables[inputBuy - 1][consumable];
        else return console.log(`\nSorry, not enough ${coffeMachine[consumable]}`)
    }
    console.log(`I have enough resources, making you a coffee!`);
};

const checkInputNum = (text) => {
    let inputed;
    do {
        inputed = Number(input(text))
    } while (inputed == NaN);
    return inputed;
}

const actionFill = () => {
    coffeMachine["water"] += checkInputNum("\nWrite how many ml of water you want to add:\n");
    coffeMachine["milk"] += checkInputNum("\nWrite how many ml of milk you want to add:\n");
    coffeMachine["beans"] += checkInputNum("\nWrite how many grams of coffee beans you want to add:\n");
    coffeMachine["cups"] += checkInputNum("\nWrite how many disposable coffee cups you want to add:\n");
};

const actionTake = () => {
    console.log(`I gave you $${coffeMachine["money"]}`);
    coffeMachine["money"] = 0;
};

const action = () => {
    let inputAction = input(`\nWrite action (buy, fill, take, remaining, exit):\n`);
    while(inputAction !== "exit") {
        if (inputAction === "buy") actionBuy();
        if (inputAction === "fill") actionFill();
        if (inputAction === "take") actionTake();
        if (inputAction === "remaining") actionRemaining();
        inputAction = input("\nWrite action (buy, fill, take, remaining, exit):\n");
    }
};

action();