const fs = require('fs');
const fileContent = fs.readFileSync("2313input.txt", 'utf-8');
let maps= fileContent.split('\r\n\r\n')
maps = maps.map(map => map.split('\r\n'))

let testmap = maps[0]
console.log(testmap)

let searchreflection = function(map) {
    let candidate = {}
    for(let row = 0; row < map.length-1; row++){
        if(map[row]===map[row+1]){
            let size = 0
            let j=0
            let reflection = true
            while (j+row+1 < map.length && row-j >= 0 && reflection){
                if(map[row-j]===map[row+1+j]){
                    size+=2
                    j++
                } else {
                    reflection = false
                }
            }
            if (reflection){
                candidate[size] = row
            } 
            console.log(row,size)
        }
    }
    let refLine = 0
    if (Object.keys(candidate).length > 0){
        console.log(candidate)
        console.log(Object.keys(candidate))
        console.log(Math.max(Object.keys(candidate)))
        refLine = candidate[Math.max(Object.keys(candidate))] + 1
    }
    return refLine
    
}

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

let partone = function(maps){
    let answers = {}

    for(let i=0; i<maps.length; i++){
        console.log(`Map number ${i}`)
        let horizontal = searchreflection(maps[i])
        let vertical = 0
        if (horizontal == 0){
            let rotatedMap = rotate90Degrees(maps[i])
            vertical = searchreflection(rotatedMap)
        }
    
        answers[i] = [horizontal,vertical]
    }

    return answers
}

let answers = partone(maps)

// Initialize sum variables
let sumFirstItem = 0;
let sumSecondItem = 0;

// Iterate over the values of the object and accumulate sums
for (let key in answers) {
  let values = answers[key];
  sumFirstItem += values[0];
  sumSecondItem += values[1];
}

console.log("Sum of the first items:", sumFirstItem);
console.log("Sum of the second items:", sumSecondItem);
console.log(`total is ${sumFirstItem*100+sumSecondItem}`)





