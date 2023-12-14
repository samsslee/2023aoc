const fs = require('fs');
const fileContent = fs.readFileSync("2313input.txt", 'utf-8');
let maps= fileContent.split('\r\n\r\n')
maps = maps.map(map => map.split('\r\n'))

function levenshteinSubModded(a, b) {
    if (a.length !== b.length) {
      throw new Error("Strings must have the same length for substitution distance calculation.");
    }
  
    let distance = 0;
  
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        distance++;
      }
      if (distance == 2){
        break;
      }
    }
  
    return distance;
}

let searchreflection = function(map) {
    let candidate = {}
    let smudgeCounter = 0
    for(let row = 0; row < map.length-1; row++){
        let distance = levenshteinSubModded(map[row],map[row+1])
        if(distance < 2){ //they're equal or one off by each other, because if they're 2 different we don't care
            let size = 0
            let j = 0
            let reflection = true
            while (j+row+1 < map.length && row-j >= 0 && smudgeCounter <=1 && reflection){
                distance = j===0 ? distance : levenshteinSubModded(map[row-j],map[j+row+1]) //just to not go through levenshtein an extra time
                if(distance < 2){
                    smudgeCounter += distance //can either be 0 or 1 when we start
                    size +=2
                    j++
                } else {
                    reflection = false
                }
            }

            if (reflection && smudgeCounter == 1){
                candidate[size] = row
            }
            //reset smudge counter
            smudgeCounter = 0
        }

    }
    let refLine = 0
    if (Object.keys(candidate).length > 0){
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

let parttwo = function(maps){
    let answers = {}

    for(let i=0; i<maps.length; i++){
        console.log(`Map number ${i}`)
        let horizontal = searchreflection(maps[i])
        let vertical = 0
        if (horizontal == 0){
            console.log("vertical search",i)
            let rotatedMap = rotate90Degrees(maps[i])
            vertical = searchreflection(rotatedMap)
        }
    
        answers[i] = [horizontal,vertical]
    }

    return answers
}

let answers = parttwo(maps)
console.log(answers)

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





