let fs = require("fs")
let city = fs.readFileSync("2317input.txt").toString('UTF8').split('\r\n').map(row => row.split('').map(cell => parseInt(cell, 10)))
let cityrows = city.length
let citycols = city[0].length

class MinHeap {
    constructor() {
      this.heap = [];
      this.nodeMap = {};
    }
    getKey(node) {
        return `${node.x}_${node.y}_${node.d.r}_${node.d.c}_${node.s}`; // Modify this based on your node representation
    }

    insert(value, node) {
      this.heap.push({ value, node });
      this.nodeMap[this.getKey(node)] = this.heap.length - 1; // Update mapping
      this.bubbleUp();
    }
  
    extractMin() {
      if (this.heap.length === 0) {
        return null;
      }
      if (this.heap.length === 1) {
        return this.heap.pop();
      }
  
      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapify(0);
  
      return min;
    }
  
    bubbleUp() {
      let currentIndex = this.heap.length - 1;
  
      while (currentIndex > 0) {
        const parentIndex = Math.floor((currentIndex - 1) / 2);
        if (this.heap[currentIndex].value < this.heap[parentIndex].value) {
          [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
          currentIndex = parentIndex;
        } else {
          break;
        }
      }
    }
  
    heapify(index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;
  
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].value < this.heap[smallestIndex].value) {
        smallestIndex = leftChildIndex;
      }
  
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].value < this.heap[smallestIndex].value) {
        smallestIndex = rightChildIndex;
      }
  
      if (smallestIndex !== index) {
        [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
        this.heapify(smallestIndex);
      }
    }
  
    getMin(filterCondition) {
        if (this.heap.length === 0) {
          return null;
        }
    
        // Filter elements based on the condition
        const filteredHeap = this.heap.filter(filterCondition);
    
        // Find the minimum value in the filtered heap
        const min = filteredHeap.reduce((minElement, currentElement) => {
          return currentElement.value < minElement.value ? currentElement : minElement;
        }, filteredHeap[0]);
    
        return min;
    }
    contains(node) {
        const key = this.getKey(node);
        if (this.nodeMap.hasOwnProperty(key)) {
            const heapIndex = this.nodeMap[key];
            if (heapIndex != undefined && heapIndex < this.heap.length) {
                console.log("contains", heapIndex,this.heap[heapIndex])
                return this.heap[heapIndex].node;
            }
        }
        return null;
    }
}
  
  
let distance = new MinHeap()
let SPTset = new Set();
const filterCondition = function (element) {
    return !SPTset.has(element.node);
};

distance.insert(0, {x:0, y:0, d:{r:1,c:0}, s:0}); //initialize down

let makeNeighbors = function(node){
    let neighbors = []

    if(node.s < 3){ // for cases where you can still push nodes in the same direction
        let [new_x,new_y] = [node.x + node.d.r, node.y + node.d.c]
        let isInBounds = new_x >= 0 && new_x < cityrows && new_y >= 0 && new_y < citycols;
        if (isInBounds){
            neighbors.push({x:new_x, y:new_y, d:node.d, s:node.s+1})
        } 
    }
    //for all other cases you can always check the other directions
    if(node.d.r == 0){ //you are going horizontally, add verticals
        let new_x= node.x-1
        console.log("node.x", node.x)
        //up
        if (new_x >=0){
            console.log("newx", new_x)
            neighbors.push({x:new_x, y:node.y, d:{r:-1,c:0}, s:1})
        }
        //down
        new_x = node.x+1
        if (new_x < cityrows){
            neighbors.push({x:new_x, y:node.y, d:{r:1,c:0}, s:1})
        }
    } else { // you are going vertically, add horizontals
        let new_y = node.y-1
        //left
        if (new_y >=0){
            neighbors.push({x:node.x, y:new_y, d:{r:0,c:-1}, s:1})
        }
        new_y = node.y+1
        //right
        if (new_y < citycols){
            neighbors.push({x:node.x, y:new_y, d:{r:0,c:1}, s:1})
        }
    }
    return neighbors
}

while (SPTset.size >= 0){
    let minDist = distance.getMin(filterCondition);
    if (!minDist || (minDist.node.x == cityrows-1 && minDist.node.y == citycols-1)) {
        fs.writeFileSync("output.txt", JSON.stringify(distance));
        console.log(minDist)
        break;
    }
    console.log("mindist", minDist)
    SPTset.add(minDist.node);
    let neighbors = makeNeighbors(minDist.node)
    for (let neighbor of neighbors){
        let newDist = minDist.value + city[neighbor.x][neighbor.y]
        //console.log(minDist.value, city[neighbor.x][neighbor.y] )
        let existingNode = distance.contains(neighbor)
        //console.log("existing node", existingNode)
        if (!existingNode || newDist < existingNode.value) {
            //console.log("HELLO", existingNode, neighbor)
            distance.insert(newDist, neighbor);
        }

        distance.insert(newDist, neighbor)
    }
    const SPTarray = Array.from(SPTset);
    const lastElement = SPTarray[SPTarray.length - 1];

    console.log("last element", lastElement);
}


