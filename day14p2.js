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

let collapseRow = function(rocks,i){
    let row = [...rocks[i]]

    let length = row.length
    let marker = row.length
    let bumper = 0

    for(let i = length-1; i>=0; i--){
        if (row[i] == "O"){
            row[i] = '.'
            row[marker-bumper-1] = 'O'
            bumper++
        } else if (row[i] == "#"){
            marker = i
            bumper = 0
        }
    }

    rocks[i] = row.join('')
}

let calculateTotal = function(rocks){
    let total = 0
    for (row of rocks){
        for (let i = 0; i<row.length; i++){
            if (row[i] == "O"){
                total += (i+1)
            }
        }
    }
    //console.log(total)
    return total
}

let parttwo = function(rocks){

    let allTotal = {}
    
    for (let quarterRotations = 1; quarterRotations<800; quarterRotations++){
        for (let i=0; i<rocks.length; i++){
            collapseRow(rocks,i)
        }
        rocks = rotate90Degrees(rocks)
        
        if (quarterRotations%4 == 0){
            //console.log(rocks)
            allTotal[quarterRotations/4] = calculateTotal(rocks)
        }
    }
    
    console.log(allTotal)

}

parttwo(rotatedRocks)
