let fs = require('fs')
let garden = fs.readFileSync("2321input.txt", 'utf-8').split('\r\n').map(row => row.split(''))
//let S = {x:5,y:7} //lazy counting for now
let queue = {0:new Set([[65,65]])} //N:[[x,y],[x,y]]

const stepper = function(array, N){
    let nextarray = []
    for(let coord of array){
        let x = coord[0]
        let y = coord[1]
        garden[x][y] = 0

        if(x-1 >= 0 && garden[x-1][y] != "#") {
            nextarray.push([x-1,y])
            }
        if(x+1 < garden.length && garden[x+1][y] != "#") {
            nextarray.push([x+1,y])
            }
        if(y-1 >= 0 && garden[x][y-1] != "#") {
            nextarray.push([x,y-1])
            }
        if(y+1 < garden[0].length && garden[x][y+1] != "#") {
            nextarray.push([x,y+1])
            }
    }
    let uniqueArrays = new Set(nextarray.map(JSON.stringify));
    queue[N+1] = Array.from(uniqueArrays, JSON.parse);
    //console.log(queue)
}

let count = 0
while (count<64){
    stepper(queue[count],count)
    //console.log(count,queue)
    count++
}
console.log(queue[64].length)
