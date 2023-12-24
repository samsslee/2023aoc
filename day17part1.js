const fs = require('fs');
let city = fs.readFileSync("2317input.txt", 'utf-8').split('\r\n').map(row => row.split('').map(Number))

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
insertQueue({d: 0, n:{x:0, y:0, p:{x:1,y:0}, s:0}})//distance, coordinates, pointing direction ( 1 2 3 4 = e s w n), step counter
insertQueue({d: 0, n:{x:0, y:0, p:{x:0,y:1}, s:0}})//east

const buildNeighbor = function(state,p,s){
    let newx = state.n.x + p.x
    let newy = state.n.y + p.y
    let newd = state.d + city[newx][newy]

    return {d:newd, n:{x:newx, y:newy, p:{x:p.x, y:p.y}, s:s}}
}

const ammendQueue = function(neighbor){
    if(!sptSet.has(JSON.stringify(neighbor.n))){ //if it's not already a visited state
        let index = queue.findIndex(obj => {
            return JSON.stringify(obj.n) === JSON.stringify(neighbor.n);
        });
        if (index >= 0){ //if it's already enqueued
            queue[index].d = Math.min(queue[index].d, neighbor.d)  //update how short of a space you can use to get to it
        } else { //else just enqueue it normally
            insertQueue(neighbor)
        }
    }
}

const makeNeighbors = function(state){
    let inbounds = {
        '{"x":1,"y":0}': (x,y) => x + 1 < 141,
        '{"x":-1,"y":0}': (x,y) => x - 1 >= 0,
        '{"x":0,"y":1}': (x,y) => y + 1 < 141,
        '{"x":0,"y":-1}': (x,y) => y - 1 >=0
    }

    //should we continue in this current direction?
    if(state.n.s < 3){ //if we aren't at 3 steps yet
        if(inbounds[JSON.stringify(state.n.p)](state.n.x, state.n.y)){ //if we are in bounds according to the direction
            let neighbor = buildNeighbor(state,state.n.p,state.n.s+1)
            ammendQueue(neighbor)
        }
    }

    //if we are going vertically
    if(state.n.p.x != 0){
        if(inbounds['{"x":0,"y":1}'](state.n.x, state.n.y)){
            let neighbor = buildNeighbor(state,{x:0,y:1},1)
            ammendQueue(neighbor)
        }
        if(inbounds['{"x":0,"y":-1}'](state.n.x, state.n.y)){
            let neighbor = buildNeighbor(state,{x:0,y:-1},1) //left
            ammendQueue(neighbor)
        }
    }else{ //else you're going horizontally so make the verticals
        if(inbounds['{"x":1,"y":0}'](state.n.x, state.n.y)){
            let neighbor = buildNeighbor(state,{x:1,y:0},1) //down
            ammendQueue(neighbor)
        }
        if(inbounds['{"x":-1,"y":0}'](state.n.x, state.n.y)){
            let neighbor = buildNeighbor(state,{x:-1,y:0},1) //up
            ammendQueue(neighbor)
        }
    }
}

let count = 0
while (!end && queue.length>0){
    //console.log("queue", queue)
    let current = queue.pop()
    console.log("current", current, count)
    sptSet.add(JSON.stringify(current.n))
    if(current.n.x == 140 && current.n.y == 140){
        end = true
    } else {
        makeNeighbors(current)
    }
    count++
}
