// 1. Deposit some money
// 2. Determine number of lines to bet
// 3. Bet amount
// 4. Spin slot machine
// 5. Check if user won
// 6. Return win/Take bet
// 7. play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}


const deposit = () =>   {
    while(true) {
    const depositAmount = prompt("Enter a deposit amount: $");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount)  || numberDepositAmount <= 0)
        console.log("Invalid deposit amount!");
    else
        return numberDepositAmount;
    }
}
const getNumLines = () => {
    while(true) {
        const lineAmount = prompt("Enter number of lines to bet on (1-3): ");
        const numberLines = parseFloat(lineAmount);
    
        if(isNaN(numberLines)  || numberLines <= 0 || numberLines >= 4)
            console.log("Invalid number of lines!");
        else
            return numberLines;
        }
}
const getBet = (balance, lines) => {
    while(true) {
        const betAmount = prompt("Enter bet per line: $");
        const numberBet = parseFloat(betAmount);
    
        if(isNaN(numberBet)  || numberBet <= 0 || (balance / lines) < numberBet)
            console.log("Invalid bet amount!");
        else
            return numberBet;
        }
}

const spin = () =>  {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT))  {
        for(let i = 0; i < count; i++)
            symbols.push(symbol);
    }
    const reels = [];
    for(let i = 0; i < COLS; i++)   {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++)   {   // Could do manipulation here
            const rand = Math.floor(Math.random() * reelSymbols.length);    // Math.random gens a number 0-1
            const selectedSymbol = reelSymbols[rand];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(rand, 1);    // Splice gets rid of one item at index rand
        }
    }
    return reels;
}
const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++)   {
        rows.push([]);
        for(let j = 0; j < COLS; j++)   {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries())    {
            rowString += symbol;
            if(i != row.length - 1)
                rowString += " | ";
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row < lines; row++)    {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols)    {
            if(symbol != symbols[0])    {
                allSame = false;
                break;
            }
        }
        if(allSame)
            winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
    return winnings;
}

const game = () =>  {
    let balance = deposit();
    while(true) {
        console.log("You have a balance of $" + balance);
        const numOfLines = getNumLines();
        let bet = getBet(balance, numOfLines);
        balance -= bet * numOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numOfLines);
        balance += winnings;
        console.log("You have won $" + winnings);

        if(balance <= 0)    {
            console.log("You ran out of money :(")
            break;
        }
        const playAgain = prompt("Do you want to deposit more? (y/n) ");
        if(playAgain != "y") break;
        }
}

game();