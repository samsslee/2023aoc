const fs = require('fs');

const parseGameLine = line => {
    const [gameNumber, gameData] = line.split(':');
    const reveals = gameData.trim().split(';')
    //console.log("parse")
    const power = colorCounter(reveals)
    console.log(gameNumber, power)

    return power
};

const readFileLines = filename => {
    const fileContent = fs.readFileSync(filename).toString('UTF8');
    const lines = fileContent.split('\r\n');
    let total = 0
    
    for (let line in lines){
        total += parseGameLine(lines[line])
    }
    
    return total
};

const colorCounter = reveals =>{
    let sumofhighs = 0
    let i = 0
    let highs = {red:0, blue:0, green:0}

    // console.log("count")

    while(i<reveals.length){
        let balls = reveals[i].trim().split(',')
        console.log(balls)
        let j=0
        while (j<balls.length){
            let [count, color] = balls[j].trim().split(' ')
            console.log(count, color)
            highs[color] = highs[color] < Number(count) ? Number(count) : highs[color]
            j++
        }
        i++
    }

    sumofhighs = highs["red"] * highs["blue"] * highs["green"]

    return sumofhighs

}

// Example usage:
const filename = '2302input.txt';
const allGames = readFileLines(filename);
console.log(allGames);
