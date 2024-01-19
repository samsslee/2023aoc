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

//follow through and bfs find nodes
let start = [0,1]
let end = [arr.length-1, arr.length-2]

const nexttiles = function(x,y,dx,dy){

    //need to add an exit condition for when we're at the end

    //console.log(x,y,dx,dy)
    let tile = arr[x][y]
    let nexttiles = []

    let dirdict = {"v":[1,0], "^":[-1,0], ">":[0,1], "<":[0,-1]}

    const validchild = function(tile,dx,dy){
        let isInput = true
        let notWall = tile != "#"

        if (notWall){
            isInput = dirdict[tile][0] * -1 == dx && dirdict[tile][1] * -1 == dy
        }

        return notWall && !isInput
    }
    if (tile == '.'){ //return all the possible surrounding paths, you could be at a node
        if (validchild(arr[x+dx][y+dy],dx,dy)){nexttiles.push([x+dx,y+dy,dx,dy])} //same direction
        if (validchild(arr[x+dy][y+dx],dy,dx)){nexttiles.push([x+dy,y+dx,dy,dx])} //rotate 90
        if (validchild(arr[x-dy][y-dx],-dy,-dx)){nexttiles.push([x-dy,y-dx,-dy,-dx])} //rotate -90
    } else { //you will only have one direction possible
        let dir = dirdict[tile]
        nexttiles.push([x+dir[0], y+dir[1], ...dir])
    }
    return nexttiles
}

//console.log(nexttiles(19,13,1,0))

const nodeFinder = (src)=>{
    let steps = 0 // or 1? at the very end i might have to -1 to take out the first-first step
    let node = false

    while(!node && src[0] != arr.length){ //don't know if this exit condition is necc but ok
        let child = nexttiles(...src)
        console.log(child, child.length)
        if (child.length != 1){
            node = true
            return [steps, src, child]
        } else {
            src = child[0]
            steps++
        }
    }

}
//console.log(nodeFinder());

const main = ()=>{

    let edges = new Map([])

    let src = [...start,1,0]
    edges.set([src, []])
    
    let [steps, dest, children] = nodeFinder(src)

    //a little confused here about what should be the OG source and what's the final dest.


}



