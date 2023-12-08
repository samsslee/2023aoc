// Importing the fs module
let fs = require("fs");

// Intitializing the readFileLines with the file
const readFileLines = filename => {
    let hands = fs.readFileSync(filename)
    .toString('UTF8').replace(/T/g,"a").replace(/J/g,"1").replace(/Q/g,"c").replace(/K/g,"d").replace(/A/g,"e")
    .split('\r\n'); //regex splits it by line

    let handsarray = []
 
    hands.forEach( hand => {
        let [cards, score] = hand.split(/\s+/)
        cards = categorizehand(cards) + cards
        handsarray.push([cards,score])
    })

    return handsarray.sort((a, b) => a[0].localeCompare(b[0])).reverse()
}

let categorizehand = function (cards){

    let ranks = {5:'6', 4:'5', "house":'4', "three": '3', "twopair":'2', "pair":'1', 1:'0' }

    const charCounts = {}
    let Jcounter = 0

    for (let i = 0; i < cards.length; i++) {
        const char = cards[i];
        if (char == "1"){
            Jcounter++
        } else {
            charCounts[char] = (charCounts[char] || 0) + 1;
        }
    }


    let maxCount = 0;

    for (let char in charCounts) {
        if (charCounts[char] > maxCount) {
            maxCount = charCounts[char];
        }
    }

    //boost any scores
    maxCount += Jcounter

    //if there are no j's then do this regularly
    if (maxCount == 3){
        if (Object.keys(charCounts).length == 2){
            return ranks["house"]
        } else return ranks["three"]
    } else if (maxCount == 2){
        if (Object.keys(charCounts).length == 3){
            return ranks["twopair"]
        } else return ranks["pair"]
    } else {
        return ranks[maxCount]
    }

}


// Calling the readFiles function with file name
let sortedhands = readFileLines('2307input.txt');
console.log(sortedhands)
let totalscore = 0
for (hand in sortedhands){
    totalscore+=(sortedhands.length - hand) * sortedhands[hand][1]
}

// Printing the response array
console.log(totalscore);
