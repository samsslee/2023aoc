const fs = require('fs');
const fileContent = fs.readFileSync("2310input.txt", 'utf-8');
let pipes = fileContent.split('\r\n')
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

let partone = function(){
    let count = 0
    let [n1, n2] = findStartNeighbors(S,pipes)
    console.log(n1,n2)
    count++
    let [n1loc,n1dir] = n1
    let [n2loc,n2dir] = n2

    while (!(n1loc[0] == n2loc[0] && n1loc[1] == n2loc[1])){
        let pipe1 = pipes[n1loc[0]][n1loc[1]]
        let trans1 = pipedict[pipe1]
        let newdir1 = addPair(n1dir,trans1)
        let newloc1 = addPair(n1loc,newdir1)
        n1loc = newloc1
        n1dir = newdir1

        let pipe2 = pipes[n2loc[0]][n2loc[1]]
        let trans2 = pipedict[pipe2]
        let newdir2 = addPair(n2dir,trans2)
        let newloc2 = addPair(n2loc,newdir2)
        n2loc = newloc2
        n2dir = newdir2
        count++
        console.log(count,n1loc,n2loc)
    }
    return count
}

let farthest = partone()

//mod part 1 to make the symbols special




//console.log(pipes)


