// Importing the fs module
let fs = require("fs")

// Intitializing the readFileLines with the file
const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\r\n'); //regex splits it by line

// Calling the readFiles function with file name
let wires = readFileLines('2325input.txt');

// Printing the response array
console.log(wires);

//turn them into pairs of numbers
let numWire = {};
let wirecount = 0;
let edgesList = [];

for (let c of wires) {
    let [w, wcs] = c.split(": ");
    wcs = wcs.split(" ");

    if (isNaN(numWire[w])) {
        numWire[w] = wirecount++;
    }
    let mappedW = numWire[w];

    for (let wc of wcs) {

        if (isNaN(numWire[wc])) {
            numWire[wc] = wirecount++;
        }
        let mappedWC = numWire[wc];

        edgesList.push([mappedW, mappedWC]);
    }
}

console.log(edgesList, numWire);

let contracting = []


class Edge {
	constructor(s, d) {
		this.src = s;
		this.dest = d;
	}
}

class Graph {
	constructor(v, e) {
		this.V = v;
		this.E = e;
		this.edge = [];
	}
}

class subset {
	constructor(p, r) {
		this.parent = p;
		this.rank = r;
	}
}

function kargerMinCut(graph) {
	let V = graph.V;
	let E = graph.E;
	let edge = graph.edge;

	let subsets = [];

	for (let v = 0; v < V; v++) {
		subsets[v] = new subset(v, 0);
	}

	let vertices = V;

	while (vertices > 2) {
		let i = Math.floor(Math.random() * E);

		let subset1 = find(subsets, edge[i].src);
		let subset2 = find(subsets, edge[i].dest);

		if (subset1 === subset2) {
			continue;
		} else {
			console.log("Contracting edge " + edge[i].src + "-" + edge[i].dest);
			vertices--;
			Union(subsets, subset1, subset2);
		}
	}

	let cutedges = 0;
	for (let i = 0; i < E; i++) {
		let subset1 = find(subsets, edge[i].src);
		let subset2 = find(subsets, edge[i].dest);
		if (subset1 !== subset2) {
			cutedges++;
		}
	}

	return [cutedges, subsets];
}

function find(subsets, i) {
	if (subsets[i].parent !== i) {
		subsets[i].parent = find(subsets, subsets[i].parent);
	}
	return subsets[i].parent;
}

function Union(subsets, x, y) {
	let xroot = find(subsets, x);
	let yroot = find(subsets, y);

	if (subsets[xroot].rank < subsets[yroot].rank) {
		subsets[xroot].parent = yroot;
	} else if (subsets[xroot].rank > subsets[yroot].rank) {
		subsets[yroot].parent = xroot;
	} else {
		subsets[yroot].parent = xroot;
		subsets[xroot].rank++;
	}

}
// Driver program to test above functions
function main() {

    let V = Object.keys(numWire).length, E = edgesList.length;
    let graph = new Graph(V, E);


    for (let e in edgesList){
        graph.edge[e] = new Edge(edgesList[e][0], edgesList[e][1])
    }

    // Use a different seed value for every run.
    let r = Math.random();
    let [cutedges, subsets] = kargerMinCut(graph);
    console.log(
        "Cut found by Karger's randomized algo is " + cutedges
    );
    return [cutedges, subsets]
}

let cuts = 0
let subsets
let g1 = 0

while (cuts !=3){
    [cuts, subsets] = main();
}


let p1 = subsets[0].parent
for (let i=0; i<subsets.length; i++){
    if (subsets[i].parent == p1){
        g1++
    }
}
console.log("answer", g1*Object.keys(numWire).length-g1)

