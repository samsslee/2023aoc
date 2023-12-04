const fs = require('fs');

const parseCard = line => {
    let [cardNumber, cardContent] = line.split(':');
    cardNumber = Number(cardNumber.split(/\s+/)[1])
    const [winnings, yournums] = cardContent.split('|')

    const winSet = new Set(winnings.trim().split(/\s+/))
    const yournumsarray = yournums.trim().split(/\s+/)
    console.log(yournumsarray);
    let points = 0

    for (let i=0; i < yournumsarray.length; i++){
        if (winSet.has(yournumsarray[i])){
            console.log(yournumsarray[i])
            points++
        }
    }

    return [cardNumber, points]
};

const readFileLines = filename => {
    const fileContent = fs.readFileSync(filename).toString('UTF8');
    const lines = fileContent.split('\r\n');
    let ogCount = lines.length //don't add this at the end you already start with all 1's
    let copyCounter = Array(ogCount).fill(1); 
    
    for (let line=0; line<ogCount; line++){
        console.log(`LINE ${line}`);
        let [cardNumber, points] = parseCard(lines[line])
        let currentCardCopies = copyCounter[line]
        console.log(`POINTS ${points}`)
        console.log(`CARDNUMBER ${cardNumber}`)
        //add N_copyCount to the next N_points cards.
        //since card 1 would start adding copies for things starting at card 2, the indexing works out.
        for(let i=cardNumber; i<cardNumber+points && i<ogCount; i++){// don't accidentally keep adding past the total amount of cards
            console.log(line, points, i);
            copyCounter[i] = copyCounter[i] + currentCardCopies
            console.log(copyCounter[i])
        }

    }

    let sum = Object.values(copyCounter).reduce((a, b) => a + b, 0);

    //console.log(copyCounter[201])
    
    return sum
};



// Example usage:
const filename = '2304input.txt';
const allCardsTotal = readFileLines(filename);
console.log(allCardsTotal);
