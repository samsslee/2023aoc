const fs = require('fs');

const parseGameLine = line => {
    const [gameNumber, gameData] = line.split(':');
    const reveals = gameData.trim().split(';')
    //console.log("parse")
    const revealokay = colorCounter(reveals)
    console.log(gameNumber, revealokay)
    let toAddGame

    if(revealokay){
        toAddGame = Number(gameNumber.split(" ")[1])
    }else{
        toAddGame = 0
    }
    console.log(toAddGame)

    return toAddGame
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
    let gameokay = true
    let i = 0

    // console.log("count")

    while(gameokay && i<reveals.length){
        let balls = reveals[i].trim().split(',')
        console.log(balls)
        let j=0
        while (gameokay && j<balls.length){
            let [count, color] = balls[j].trim().split(' ')
            console.log(count)
            if (Number(count) > 12){
                if(color == "red"){
                    gameokay = false
                } else if (color == "green" && Number(count) > 13){
                    gameokay = false
                } else if (Number(count)>14){
                    gameokay = false
                }
            }
            j++
        }
        i++
    }

    // console.log(gameokay)

    return gameokay

}

// Example usage:
const filename = '2302input.txt';
const allGames = readFileLines(filename);
console.log(allGames);
