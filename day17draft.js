const fs = require('fs');
let city = fs.readFileSync("2317input.txt", 'utf-8').split('\r\n').map(row => row.split('').map(Number))
//console.log(city)

let queue = []
let end = false
let sptSet = new Set()

const insertQueue = function(state) {
    //console.log("state", state)
    let low = 0
    let high = queue.length // might have to pass this in later idk

    while (low < high){
        const mid = Math.floor((low+high)/2)
        //console.log(state.d, queue[mid].d)
        if(state.d > queue[mid].d){
            high = mid;
        } else {
          low = mid + 1;
        }
    }

    queue.splice(low, 0, state);
    //console.log(queue)
}
insertQueue({d: 0, n:{x:0, y:0, p:{x:1,y:0}, s:1}})//distance, coordinates, pointing direction ( 1 2 3 4 = e s w n), step counter
insertQueue({d: 0, n:{x:0, y:0, p:{x:0,y:1}, s:1}})//east

const buildNeighbor = function(state,p,s){
    let newx = state.n.x + p.x
    let newy = state.n.y + p.y
    let newd = state.d + city[newx][newy]

    return {d:newd, n:{x:newx, y:newy, p:{x:p.x, y:p.y}, s:s}}
}

const makeNeighbors = function(state){
    let neighbors = []
    let inbounds = {
        '{"x":1,"y":0}': (x,y) => x + 1 < city.length,
        '{"x":-1,"y":0}': (x,y) => x - 1 >= 0,
        '{"x":0,"y":1}': (x,y) => y + 1 < city[0].length,
        '{"x":0,"y":-1}': (x,y) => y - 1 >=0
    }

    //should we continue in this current direction?
    if(state.n.s != 3){ //if we aren't at 3 steps yet
        if(inbounds[JSON.stringify(state.n.p)](state.n.x, state.n.y)){ //if we are in bounds according to the direction
            neighbors.push(buildNeighbor(state,state.n.p,state.n.s+1)) //push new distances and coordinates but same pointing direction, add one to the step counter
        }
    }

    //if we are going vertically
    if(state.n.p.x != 0){
        if(inbounds['{"x":0,"y":1}'](state.n.x, state.n.y)){
            let neighbor = buildNeighbor(state,{x:0,y:1},1)
            console.log(sptSet.size, JSON.stringify(neighbor.n), sptSet)
            console.log("here", sptSet.has(JSON.stringify(neighbor.n)), neighbor.n, sptSet.size)
            if(!sptSet.has(JSON.stringify(neighbor.n))){
                console.log("inside", neighbor.n)
                neighbors.push(neighbor)
            }
        }
        if(inbounds['{"x":0,"y":-1}'](state.n.x, state.n.y)){
            let neighbor = buildNeighbor(state,{x:0,y:-1},1) //left
            if(!sptSet.has(JSON.stringify(neighbor.n))){
                neighbors.push(neighbor)
            }
        }
    }else{ //else you're going horizontally so make the verticals
        if(inbounds['{"x":1,"y":0}'](state.n.x, state.n.y)){
            let neighbor = buildNeighbor(state,{x:1,y:0},1) //down
            console.log("neibnode", neighbor.n)
            if(!sptSet.has(JSON.stringify(neighbor.n))){
                neighbors.push(neighbor)
            }
        }
        if(inbounds['{"x":-1,"y":0}'](state.n.x, state.n.y)){
            let neighbor = buildNeighbor(state,{x:-1,y:0},1) //up
            if(!sptSet.has(JSON.stringify(neighbor.n))){
                neighbors.push(neighbor)
            }
        }
    }

    console.log(neighbors)
    return neighbors
}
let count = 0
while (count<500){
    let current = queue.pop()
    //console.log("current", current)
    //console.log("queue", queue)
    console.log(sptSet.has(JSON.stringify(current.n)), sptSet.size)
    sptSet.add(JSON.stringify(current.n))
    console.log(sptSet.has(JSON.stringify(current.n)), sptSet.size)
    //console.log(sptSet)
    if(current.n.x == city.length && current.n.y == city[0].length){
        //console.log(current)
        end = true
    } else {
        let neighbors = makeNeighbors(current)
        for (let neighbor of neighbors){
            insertQueue(neighbor)
        }
    }
    count++
}
