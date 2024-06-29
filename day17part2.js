const fs = require("fs");
// Read input file and split by lines
const inputLines = fs.readFileSync("input17.txt", "utf8").trim().split("\n");
const input = inputLines.map(line => line.trim().split("").map(Number));
const rows = input.length;
const columns = input[0].length;
let currMinHeat = Infinity;
let queue = [] //to be heapified [{w:(x,y), d: 1, h: 15}]
let visited = new Map()


const heapifyUp = (queue, n, i) =>{ //heapify the ith node
    //find "parent" index
    let parent = Math.floor((i-1)/2) //the middle node

    if (parent >=0) { //if parent isn't the very start
        if(queue[i].h < queue[parent].h){ //if the current heat is smaller than the parent, swap
            let temp = queue[i]
            queue[i] = queue[parent]
            queue[parent] = temp

            //iterate
            heapifyUp(queue, n, parent)
        }
    }
}

const heapifyDown = (queue, n, i) =>{
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && queue[left].h < queue[smallest].h) {
        smallest = left;
    }

    if (right < n && queue[right].h < queue[smallest].h) {
        smallest = right;
    }

    if (smallest !== i) {
        let temp = queue[i]
            queue[i] = queue[smallest]
            queue[smallest] = temp
        
        heapifyDown(queue, n, smallest);
    }
}

const insertHeap = (queue, node)=>{
    queue.push(node)
    let n = queue.length
    heapifyUp(queue,n,n-1)
}

const deleteHeapRoot = (queue)=>{
    let n = queue.length
    queue[0] = queue[n-1]
    queue.pop()
    heapifyDown(queue,n-1,0)
}

insertHeap(queue,{x:0, y:0, d: 1, h: 0})
insertHeap(queue,{x:0, y:0, d: 2, h: 0})

let minsteps = 4
let maxsteps = 10

const walk = (node, queue) => {
    let currHeat = node.h;

    if (node.d % 2 === 0) { // Vertical direction
        // Make neighbors to the right (direction 1)
        for (let i = 1; i <= maxsteps; i++) {
            curry = node.y+i
            if (curry > columns-1) {break};
            currHeat += input[node.x][curry];

            if(!visited.get(`x${node.x}-y${curry}-d${1}-s${i}`) || visited.get(`x${node.x}-y${curry}-d${1}-s${i}`) > currHeat){
                
                if (i >= minsteps && currHeat < currMinHeat ) {

                    if(node.x == rows-1 && curry == columns-1){
                        currMinHeat = Math.min(currHeat, currMinHeat)
                        console.log(currMinHeat, currHeat, node.x, curry, node)
                    }

                    insertHeap(queue, { x: node.x, y: curry, d: 1, h: currHeat });
                    visited.set(`x${node.x}-y${curry}-d${1}-s${i}`, currHeat)
                }
            }

        }

        // Make neighbors to the left (direction 3)
        currHeat = node.h;
        for (let i = 1; i <= maxsteps; i++) {
            curry = node.y-i
            if (curry <0) {break};
            currHeat += input[node.x][curry];

            if(!visited.get(`x${node.x}-y${curry}-d${3}-s${i}`) || visited.get(`x${node.x}-y${curry}-d${3}-s${i}`) > currHeat){
                if (i >= minsteps && currHeat < currMinHeat ) {
                    insertHeap(queue, { x: node.x, y: curry, d: 3, h: currHeat });
                    visited.set(`x${node.x}-y${curry}-d${3}-s${i}`, currHeat)
                }
            }
        }
    } else {
        // Make neighbors down (direction 2)
        for (let i = 1; i <= maxsteps; i++) {
            currx = node.x+i
            if (currx > rows-1) {break};
            currHeat += input[currx][node.y];

            if(!visited.get(`x${currx}-y${node.y}-d${2}-s${i}`) || visited.get(`x${currx}-y${node.y}-d${2}-s${i}`) > currHeat){
                if (i >= minsteps && currHeat < currMinHeat ) {

                    if(currx == rows-1 && node.y == columns-1){
                        currMinHeat = Math.min(currHeat, currMinHeat)
                        console.log(currMinHeat, currHeat, currx, node.y, node)
                    }

                    insertHeap(queue, { x: currx, y: node.y, d: 2, h: currHeat });
                    visited.set(`x${currx}-y${node.y}-d${2}-s${i}`, currHeat)
                }
            }
        }

        // Make neighbors up (direction 0)
        currHeat = node.h;
        for (let i = 1; i <= maxsteps; i++) {
            currx = node.x-i
            if (currx < 0) {break};
            currHeat += input[currx][node.y];
            if(!visited.get(`x${currx}-y${node.y}-d${0}-s${i}`) || visited.get(`x${currx}-y${node.y}-d${0}-s${i}`) > currHeat){
                if (i >= minsteps && currHeat < currMinHeat ) {
                    insertHeap(queue, { x: currx, y: node.y, d: 0, h: currHeat });
                    visited.set(`x${currx}-y${node.y}-d${0}-s${i}`, currHeat)
                }
            }
        }
    }
};



while (queue.length > 0){
    walk(queue[0], queue)
    deleteHeapRoot(queue)
}
console.log("min", currMinHeat)



