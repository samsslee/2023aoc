const fs = require('fs');

const parseCard = line => {
    const [cardNumber, cardContent] = line.split(':');
    const [winnings, yournums] = cardContent.split('|')

    const winSet = new Set(winnings.trim().split(/\s+/))
    const yournumsarray = yournums.trim().split(/\s+/)
    console.log(yournumsarray);
    let power = 0

    for (let i=0; i < yournumsarray.length; i++){
        if (winSet.has(yournumsarray[i])){
            console.log(yournumsarray[i])
            power++
        }
    }

    let points = power == 0 ? 0 : 2**(power-1)
    console.log(power, points)

    return points
};

const readFileLines = filename => {
    const fileContent = fs.readFileSync(filename).toString('UTF8');
    const lines = fileContent.split('\r\n');
    let total = 0
    
    for (let line=0; line<lines.length; line++){
        total += parseCard(lines[line])
    }
    
    return total
};



// Example usage:
const filename = '2304input.txt';
const allCardsTotal = readFileLines(filename);
console.log(allCardsTotal);
