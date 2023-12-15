const fs = require('fs');
const { floor } = require('mathjs');
let rocks = fs.readFileSync("2314input.txt", 'utf-8').split('\r\n')
function rotate90Degrees(stringsArray) {
    // Convert strings to arrays
    let arrays = stringsArray.map(str => str.split(''));
    // Transpose the array
    let transposed = arrays[0].map((col, i) => arrays.map(row => row[i]));
    // Reverse each row
    let rotatedArrays = transposed.map(row => row.reverse());
    // Convert arrays back to strings
    let rotatedStrings = rotatedArrays.map(arr => arr.join(''));

    return rotatedStrings;
}
rotatedRocks = rotate90Degrees(rocks)

let collapseRow = function(rocks,i,direction){ //direction will only be 1 if it's north, else i'll floor it to 0
    let row = [...rocks[i]]

    let length = row.length
    let marker = row.length
    let total = 0
    let bumper = 0

    for(let i = length-1; i>=0; i--){
        if (row[i] == "O"){
            row[i] = '.'
            row[marker-bumper-1] = 'O'
            total += (marker - bumper) *direction
            bumper++
        } else if (row[i] == "#"){
            marker = i
            bumper = 0
        }
    }

    rocks[i] = row.join('')
    return total
}

let partone = function(rocks){
    let total = 0
    for (let i=0; i<rocks.length; i++){
        total +=collapseRow(rocks,i,1)
    }

    console.log(rocks) //mutated rocks directly
    return total
}

//console.log(rotatedRocks)
//partone(rotatedRocks)

let parttwo = function(rocks){

    let allTotal = {}
    
    for (let quarterRotations = 0; quarterRotations<400; quarterRotations++){
        let total = 0
        let direction = 4 - (quarterRotations % 4)
        for (let i=0; i<rocks.length; i++){
            total += collapseRow(rocks,i, Math.floor(direction/4))
        }
        rocks = rotate90Degrees(rocks)
        if (total != 0){
            allTotal[quarterRotations/4] = total
        }
    }
    
    console.log(allTotal)

}

parttwo(rotatedRocks)
