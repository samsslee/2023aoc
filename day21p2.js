let fs = require('fs')
let garden = fs.readFileSync("2321input.txt", 'utf-8').split('\r\n').map(row => row.split(''))
let queue = [[[65,65]]]

const stepper = function(array){
    let nextarray = []
    for(let coord of array){
        let x = coord[0]
        let y = coord[1]
        garden[x][y] = 0

        if(x-1 >= 0 && garden[x-1][y] != "#" && garden[x-1][y] != "0") {
            // garden[x-1][y] = 0
            nextarray.push([x-1,y])
            }
        if(x+1 < garden.length && garden[x+1][y] != "#" && garden[x+1][y] != "0") {
            // garden[x+1][y] = 0
            nextarray.push([x+1,y])
            }
        if(y-1 >= 0 && garden[x][y-1] != "#" && garden[x][y-1] != "0") {
            // garden[x][y-1] = 0
            nextarray.push([x,y-1])
            }
        if(y+1 < garden[0].length && garden[x][y+1] != "#" && garden[x][y+1] != "0") {
            // garden[x][y+1] = 0
            nextarray.push([x,y+1])
            }
    }
    if (nextarray.length > 0){
        let uniqueArrays = new Set(nextarray.map(JSON.stringify))
        queue.push(Array.from(uniqueArrays, JSON.parse))
    }
    //console.log(queue)
}

let offparity = 0
let parity = 0
let count = 0
garden[65][65] = 0
while (queue.length >0){
    let current = queue.shift()
    console.log(current.length, current)
    if(count % 2 == 1){
        parity += current.length
    } else {
        offparity += current.length
    }
    stepper(current)
    count++
}

console.log(parity)
console.log(offparity)
let gardenString = JSON.stringify(garden)
  .replace(/,/g, '')
  .replace(/"/g, '')
  .replace(/\]/g, '"]\n');

fs.writeFileSync("output2.txt", gardenString);


function sumUpDown(N) {
    let sum = 0;
  
    // Sum up from 1 to N
    for (let i = 1; i <= N; i++) {
      sum += i;
    }
  
    // Sum down from N-1 to 1
    for (let i = N - 1; i >= 1; i--) {
      sum += i;
    }
  
    return sum;
  }

let result = 0
//total parity for full grid = 7769 ; corners will be 3826 because diamond is 3943
//total off partity for full grid = 7780 ; corners will be 3922 because diamond is 3858 (as see in part 1)
//add all the relevant grids: 7769 * (1+2+....26501301+26501300+.....+2+1)
result += (sumUpDown(26501300/131 + 1) * 7769)
//continue to add all relevant grids: 7780 * (1+2+....+26501300+...+2+1)
result += (sumUpDown(26501300/131) * 7780)
//SUBTRACT 3826 * (26501300+1) parity bits that we don't use
result -= (3826 * (26501300/131 +1))
//ADD 3922 * 26501300 off parity bits that we clip the corners of
result += (3922*(26501300/131))

console.log(result)


