let fs = require("fs")

// Intitializing the readFileLines with the file
const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\r\n'); //regex splits it by line

// Calling the readFiles function with file name
let arr = readFileLines('2323input.txt').map(a => a.split(''));

// Printing the response array
//console.log(arr);


let nodes = [[0,1]]//initiate with the source/start node

//find nodes by looking through dots
const markNodes = function(arr){
    let arrows = [">","<","^","v"]

    for (let i = 1; i<arr.length-1; i++){
        for (let j = 1; j<arr[0].length-1; j++){
            if(arr[i][j] == '.'){
                let arrowCount = 0
                if(arrows.includes(arr[i+1][j])){arrowCount++}
                if(arrows.includes(arr[i-1][j])){arrowCount++}
                if(arrows.includes(arr[i][j+1])){arrowCount++}
                if(arrows.includes(arr[i][j-1])){arrowCount++}
                if(arrowCount>2){
                    arr[i][j] = "N";
                    nodes.push([i,j]) 
                }

            }

        }
    }
    return arr
}

let markedArr = markNodes(arr)

const nexttile = function(x,y,dx,dy){
    //need to add an exit condition for when we're at the end
    let tile = markedArr[x][y]
    let nexttile = []

    if (markedArr[x+dx][y+dy] != "#"){nexttile = [x+dx,y+dy,dx,dy]} //same direction
    else if (markedArr[x+dy][y+dx] != "#"){nexttile = [x+dy,y+dx,dy,dx]} //rotate 90
    else if (markedArr[x-dy][y-dx] != "#"){nexttile = [x-dy,y-dx,-dy,-dx]} //rotate -90

    return nexttile;
}

//follow an outgoing path to find it's destination
const followPath = function(x,y,dx,dy){

    let count = 0
    let tile = markedArr[x][y]
    while (tile != "N") {
        [x,y,dx,dy] = nexttile(x,y,dx,dy)
        count++
        tile = markedArr[x][y]
        if (x==0 || x==markedArr.length-1){break} //if we've reached either the entry or exit (should only apply in the exit case)
    }
    //console.log(tile,x,y,count)
    return [[x,y],count] //this will be the destination node
}

const findOutgoingNeighbors = function(nx, ny) {
    //assume that all nodes are not on the edges of the map, and assume that none of their neighbors are off the map
    let neighbors = []
    //find all 4 directions
    //console.log(markedArr[nx+1][ny],nx,ny)
    if(markedArr[nx+1][ny] == "v"){neighbors.push([nx+1,ny,1,0])}
    if(markedArr[nx-1][ny] == "^"){neighbors.push([nx-1,ny,-1,0])}
    if(markedArr[nx][ny+1] == ">"){neighbors.push([nx,ny+1,0,1])}
    if(markedArr[nx][ny-1] == "<"){neighbors.push([nx,ny-1,0,-1])}
    
    return neighbors
}

const findAllNeighbors = function(nx, ny){
    let neighbors = []

    let paths = ["v", "^", ">", "<"]

    if(paths.includes(markedArr[nx+1][ny])){neighbors.push([nx+1,ny,1,0])}
    if(paths.includes(markedArr[nx-1][ny])){neighbors.push([nx-1,ny,-1,0])}
    if(paths.includes(markedArr[nx][ny+1])){neighbors.push([nx,ny+1,0,1])}
    if(paths.includes(markedArr[nx][ny-1])){neighbors.push([nx,ny-1,0,-1])}

    return neighbors
}

//BUILD EDGES

//building all the edges
let edges = new Map([])
let nodeDistances = new Map([])

//for the first source
let start = [0,1] //start at the entry going down
//find the first node
let [dest, steps] = followPath(...start,1,0)
edges.set(JSON.stringify(nodes[0]), [{dest: JSON.stringify(dest), steps: steps, available: true}])
nodeDistances.set(JSON.stringify(nodes[0]), 0)

for (let n = 1; n <nodes.length; n++){
    //console.log(nodes[n])
    let neighbors = findAllNeighbors(nodes[n][0],nodes[n][1])
    let nodeName = JSON.stringify(nodes[n])
    //console.log(neighbors)

    for (let neighbor of neighbors){
        let [dest, steps] = followPath(...neighbor)
        if (edges.get(nodeName)){
            edges.get(nodeName).push({dest: JSON.stringify(dest), steps: steps+1, available: true})
        } else{
            edges.set(nodeName,[{dest: JSON.stringify(dest), steps: steps+1, available: true}])
            nodeDistances.set(nodeName, 0)
        }
    }
}

edges.set("source",[{dest:'[0,1]', steps:0, available: true}])
nodeDistances.set(JSON.stringify([arr.length-1,arr[0].length-2]), 0)
//console.log(nodeDistances)

const deleteDest = function(target){
    edges.forEach(s => {
        let toDelete
        for (let dest = 0; dest < s.length; dest++){
            if (s[dest].dest == target){
                s[dest].available = false
            }
        }

   })
}
//the node that has the exit should not have other paths to leave it, cheating a little here
edges.get('[123,135]').pop()
edges.get('[123,135]').pop()
//console.log(edges)
let stepCounts = []
let activeStepCount = 0

//pseudocode

//initiate everything with source set it to current

//call this function to look at current's dest
//enter for loop for every dest
//if dest is [140,139] then push stepcount as active+dest steps and return
//if there are no destinations available then unmark this one as unavailable and then return (so then it'll do the for loop)
//else mark current dest as "available = false" (and all the other ones with this destination as false)
//call recursion on this function

let mainrec = function(n){
    let current = edges.get(n)
    console.log(current)

    for(let dest = 0; dest<current.length; dest++){
        console.log("eh")
        if (current[dest].dest == "[37,13]"){ //test case for me just the third thing we should reach
            stepCounts.push(activeStepCount+current[dest].steps)
        } else if (current[dest].available == true){
            deleteDest(current[dest].dest)
            activeStepCount += current[dest].steps
            mainrec(current[dest].dest)
        }
    }

}

mainrec("source")
