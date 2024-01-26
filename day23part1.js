// Importing the fs module
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

//building all the edges
let edges = new Map([])
let nodeDistances = new Map([])

//for the first source
let start = [0,1] //start at the entry going down
//find the first node
let [dest, steps] = followPath(...start,1,0)
edges.set(JSON.stringify(nodes[0]), [{dest: JSON.stringify(dest), steps: steps}])
nodeDistances.set(JSON.stringify(nodes[0]), 0)

for (let n = 1; n <nodes.length; n++){
    //console.log(nodes[n])
    let neighbors = findOutgoingNeighbors(nodes[n][0],nodes[n][1])
    let nodeName = JSON.stringify(nodes[n])
    //console.log(neighbors)

    for (let neighbor of neighbors){
        let [dest, steps] = followPath(...neighbor)
        if (edges.get(nodeName)){
            edges.get(nodeName).push({dest: JSON.stringify(dest), steps: steps+1})
        } else{
            edges.set(nodeName,[{dest: JSON.stringify(dest), steps: steps+1}])
            nodeDistances.set(nodeName, 0)
        }
    }
}

edges.set("source",[{dest:'[0,1]', steps:0}])
nodeDistances.set(JSON.stringify([arr.length-1,arr[0].length-2]), 0)
console.log(edges)
console.log(nodeDistances)

//follow the DAG to get the longest distances for each node


let queue = [["source",0]]
let count = 0

while (queue.length>0){ //while we haven't reached the last row yet
    let current = queue.shift()
    let destinations = edges.get(current[0])
    //console.log(destinations)

    for (let dest of destinations){
        //console.log("dest", dest)
        //console.log(current[1], dest.steps)
        let totalSteps = current[1] + dest.steps
        //console.log("total", totalSteps)

        if(nodeDistances.get(dest.dest) < totalSteps){
            nodeDistances.set(dest.dest, totalSteps)
        }

        if(dest.dest != JSON.stringify([arr.length-1,arr[0].length-2])){
            queue.push([dest.dest, totalSteps])
        }
    }
    //console.log(queue)
    //console.log(nodeDistances)

    count++
}

console.log("answer", nodeDistances.get(JSON.stringify([arr.length-1,arr[0].length-2])))
