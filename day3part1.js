// Importing the fs module
let fs = require("fs")

// Intitializing the readFileLines with the file
const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\r\n'); //regex splits it by line

// Calling the readFiles function with file name
let allNumbers = readFileLines('2303input.txt');

let runningTotal = 0
let cols = allNumbers[0].length
let sampleRows = allNumbers.map(row => row.split(''));
let rows = sampleRows.length
const regex = /[^0-9.]+/;

function addPartsNumbers(sampleRows) {

    let viewer = function (row, col) {

        let currentNumber = ''

        if (row < 0 || row >= rows || col < 0 || col >= cols || sampleRows[row][col] === '.') {
            return 0;
        }
    
        if (!isNaN(Number(sampleRows[row][col]))){ //
            //console.log(`the number is: ${sampleRows[row][col]}`)
            currentNumber += sampleRows[row][col]
            sampleRows[row][col] = '.'

            //console.log(currentNumber)
            //search towards the left
            let step = 1
            while(sampleRows[row][col-step] && !isNaN(Number(sampleRows[row][col-step]))){
                currentNumber = sampleRows[row][col-step] + currentNumber
                sampleRows[row][col-step] = '.'
                //console.log(currentNumber)
                step++

            }
            //search towards the right
            step = 1
            while(sampleRows[row][col+step] && !isNaN(Number(sampleRows[row][col+step]))){
                currentNumber = currentNumber + sampleRows[row][col+step]
                sampleRows[row][col+step] = '.'
                //console.log(currentNumber)
                step++
            }
        }
        console.log(currentNumber)

        return Number(currentNumber)
    
    
    }
    
    // Printing the response array
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if(regex.test(sampleRows[i][j])){
                console.log(`before we enter ${sampleRows[i][j]}`)
                //mark current cell as visited
                sampleRows[i][j] = '.'

                //middle ones
                runningTotal += viewer(i-1,j)
                runningTotal += viewer(i+1,j)

                //to the left of the symbol
                runningTotal += viewer(i-1,j-1)
                runningTotal += viewer(i,j-1)
                runningTotal += viewer(i+1,j-1)

                //to the right of the symbol
                runningTotal += viewer(i-1,j+1)
                runningTotal += viewer(i,j+1)
                runningTotal += viewer(i+1,j+1)
            }
        }
    }
    sampleRows = sampleRows.map(row => row.join(''));
    console.log(sampleRows);
    console.log(runningTotal)

}

addPartsNumbers(sampleRows)



