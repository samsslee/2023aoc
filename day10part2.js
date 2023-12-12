const fs = require('fs');
const { CLIENT_RENEG_LIMIT } = require('tls');
const fileContent = fs.readFileSync("2310input.txt", 'utf-8');
let pipes = fileContent.split('\r\n')
pipes = pipes.map(pipe => pipe.split(''))

// let findS = function (pipes) {
//     for (let i = 0; i<pipes.length; i++){
//         if (pipes[i].includes("S")){
//             for(let j = 0; j<pipes[i].length; j++){
//                 if (pipes[i][j] == "S"){
//                     return [i,j]
//                 }
//             }
//         }
//     }
// }
// console.log(findS(pipes))
let S = [115,40] //I don't want this computed every time i debug so i just wrote it from the findS

//{entry_direction:[vertical (row) move, horizontal (column) move]}
let pipedict = {
    "|":[0,0],
    "-":[0,0],
    "L":[-1,1],
    "J":[-1,-1],
    "7":[1,-1],
    "F":[1,1],
}

let addPair = function(one, two){
    return [one[0]+two[0],one[1]+two[1]]
}


//find the first two coordinates
let findStartNeighbors = function(S,pipes){
    let neighbors = []

    //see if the up neighbor contains up-entry available symbols
    if((["|","7","F"]).includes(pipes[S[0]-1][S[1]])){
        neighbors.push([[S[0]-1,S[1]],[-1,0]])
    }
    if((["-","L","F"]).includes(pipes[S[0]][S[1]-1])){
        neighbors.push([[S[0],S[1]-1],[0,-1]])
    }
    if((["|","J","L"]).includes(pipes[S[0]+1][S[1]])){
        neighbors.push([[S[0]+1,S[1]],[1,0]])
    }
    if(["-","7","J"].includes(pipes[S[0]][S[1]+1])){
        neighbors.push([[S[0],S[1]+1],[0,1]])
    }

    return neighbors
}

let loopmarker = function(pipes){
    let [n1, n2] = findStartNeighbors(S,pipes)
    let [n1loc,n1dir] = n1
    let count = 0
    let markers = {"-": 0, "|": 3, "L":1, "J":-1, "7": 2, "F":-2, "S": 1}

    //mark as seen
    let mark = function(i, j) {
        pipes[i][j] = markers[pipes[i][j]]
    }
    mark(S[0],S[1])
    count ++

    while (!(n1loc[0] == S[0] && n1loc[1] == S[1])){
        let pipe1 = pipes[n1loc[0]][n1loc[1]]
        let trans1 = pipedict[pipe1]
        let newdir1 = addPair(n1dir,trans1)
        let newloc1 = addPair(n1loc,newdir1)
        mark(n1loc[0],n1loc[1])
        count++
        n1loc = newloc1
        n1dir = newdir1
    }
    console.log(count/2)
    return pipes
}


let parttwo = function(pipes){
    let count = 0

    let markedpipes = loopmarker(pipes)
    //console.log(markedpipes)
    //console.log(markedpipes[test].join())

    for (let i = 0; i<markedpipes.length; i++){
        let row = markedpipes[i]
        let parity = 0
        for (let j = 0; j<row.length; j++){
            let cell = row[j]
            if(Number.isInteger(cell)){
                parity = (parity + cell) % 6
                if (parity == 3) console.log("inside")
            } else {
                if (parity == 3 || parity == -3) {
                    markedpipes[i][j] = "#"
                    count++
                } else {
                    if (parity != 0) console.log(parity)
                    //console.log(`${cell} is outside`)
                }
            }
        }
    }
    markedpipes = markedpipes.map(markedrow => markedrow.join(','))
    //console.log(markedpipes)
    console.log(count)

    let arrayString = markedpipes.join('\n')

    const filePath = 'output.txt';

    // Write the array to the file
    fs.writeFile(filePath, arrayString, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Array successfully written to file:', filePath);
        }
    });
}

parttwo(pipes)


