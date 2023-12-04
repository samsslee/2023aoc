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
const regex = /\*/

function addPartsNumbers(sampleRows) {

    let viewer = function (row, col) {

        let currentNumber = ''

        if (row < 0 || row >= rows || col < 0 || col >= cols || sampleRows[row][col] === '.') {
            return;
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
                let numbersarray = []

                // middle ones
                let result1 = viewer(i - 1, j);
                let result2 = viewer(i + 1, j);
                if (result1 !== undefined) numbersarray.push(result1);
                if (result2 !== undefined) numbersarray.push(result2);

                // to the left of the symbol
                let result3 = viewer(i - 1, j - 1);
                let result4 = viewer(i, j - 1);
                let result5 = viewer(i + 1, j - 1);
                if (result3 !== undefined) numbersarray.push(result3);
                if (result4 !== undefined) numbersarray.push(result4);
                if (result5 !== undefined) numbersarray.push(result5);

                // to the right of the symbol
                let result6 = viewer(i - 1, j + 1);
                let result7 = viewer(i, j + 1);
                let result8 = viewer(i + 1, j + 1);
                if (result6 !== undefined) numbersarray.push(result6);
                if (result7 !== undefined) numbersarray.push(result7);
                if (result8 !== undefined) numbersarray.push(result8);

                console.log(numbersarray)
                if(numbersarray.length == 2){
                    console.log('yes')
                    runningTotal += numbersarray[0] * numbersarray[1]
                }

            }
        }
    }
    sampleRows = sampleRows.map(row => row.join(''));
    console.log(sampleRows);
    console.log(runningTotal)

}

addPartsNumbers(sampleRows)



